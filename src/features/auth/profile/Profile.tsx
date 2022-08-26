import React, { useEffect } from 'react'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import { useNavigate } from 'react-router-dom'

import avatar from '../../../assets/img/avatar.jpg'
import SuperButton from '../../../common/components/c2-SuperButton/SuperButton'
import { PATH } from '../../../common/components/Routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { setIsLoggedOutTC } from '../login/loginReducer'

import { EditableSpan } from './EditableSpan'
import s from './Profile.module.css'
import { updateProfileName } from './profileReducer'

export function Profile() {
  const profileName = useAppSelector<string>(state => state.profile.name)
  const email = useAppSelector<string>(state => state.profile.email)
  const isAuthMe = useAppSelector(state => state.login.isAuthMe)
  const isInitialised = useAppSelector<boolean>(state => state.startPage.isInitialize)
  const profileIsLoading = useAppSelector<boolean>(state => state.profile.isLoading)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const addPhoto = () => {
    //добавить ссылку на аватар
    alert('add foto')
  }

  // change Profile name
  const changeNameHandler = (name: string) => {
    dispatch(updateProfileName(name))
  }

  //logout on button
  const logoutButtonHandler = () => {
    dispatch(setIsLoggedOutTC())
  }

  // если не проинициализирован установить данные,  не залогинен то перейти в логин
  useEffect(() => {
    if (!isAuthMe) {
      navigate(PATH.LOGIN)
    }
  }, [isAuthMe])

  // пока не ясно залогинен или нет показывать крутилку
  if (!isInitialised) return <div>крутилка</div>

  return (
    <div className={s.container}>
      <div className={s.title}> It-incubator</div>
      <h2 className={s.title}>Personal Infomation</h2>
      {profileIsLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <div className={s.avatarContainer}>
            <img className={s.avatar} src={avatar} alt="" />
            <FontAwesomeIcon
              className={s.eye}
              onClick={addPhoto}
              icon={faCamera}
              title={'change avatar'}
            />
          </div>

          <div>
            <div className={s.minititle}>Nickname</div>

            <EditableSpan
              value={profileName}
              onChange={name => changeNameHandler(name)}
              disableEditMode={profileIsLoading}
            />

            <div className={s.minititle}>e-mail</div>
            <div>{email}</div>
          </div>
          <div>
            <SuperButton onClick={logoutButtonHandler} className={s.logoutButton}>
              logout я пшел
            </SuperButton>
          </div>
        </div>
      )}
    </div>
  )
}
