import React, { useEffect } from 'react'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

import avatar from '../../../assets/img/avatar.jpg'
import SuperButton from '../../../common/components/c2-SuperButton/SuperButton'
import { PATH } from '../../../common/components/Routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'

import { EditableSpan } from './EditableSpan'
import s from './Profile.module.css'
import { logoutProfile, setProfile, updateProfileName } from './profileReducer'

export function Profile() {
  const profileName = useAppSelector(state => state.profile.name)
  const email = useAppSelector(state => state.profile.email)
  const isAuth = useAppSelector(state => state.login.isLoggedIn)
  const isInitialised = useAppSelector(state => state.profile.isInitialised)
  const isLoading = useAppSelector(state => state.profile.isLoading)
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
    dispatch(logoutProfile())
  }

  // если не проинициализирован установить данные,  не залогинен то перейти в логин
  useEffect(() => {
    if (!isInitialised) {
      dispatch(setProfile())
    } else {
      if (!isAuth) {
        alert('перейти в логин')
        navigate(PATH.LOGIN)
      }
    }
  }, [isAuth])

  // пока не ясно залогинен или нет показывать крутилку
  if (!isInitialised) return <div>крутилка</div>

  return (
    <div className={s.container}>
      <div className={s.title}> It-incubator</div>
      <h1 className={s.title}>Personal Infomation</h1>
      {isLoading && <div>крутилка</div>}

      {!isLoading && (
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
            <div>Nickname</div>
            <EditableSpan
              value={profileName}
              onChange={name => changeNameHandler(name)}
              disableEditMode={isLoading}
            />
          </div>
          <div>{email}</div>
          <div>
            <SuperButton onClick={logoutButtonHandler}>logout button</SuperButton>
          </div>
        </div>
      )}
    </div>
  )
}
