import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { setError } from '../../../../app/appStatusReducer'
import noAvatar from '../../../../assets/img/profile_Icon.svg'
import { ButtonWithLoader } from '../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { EditableSpan } from '../../../../common/components/editableSpan/EditableSpan'
import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { BackLink } from '../../../cards/UI/backLink/BackLink'
import { setIsLoggedOutTC } from '../../login/loginReducer'
import { updateProfile } from '../profileReducer'

import { AddAvatar } from './AddAvatar/addAvatar'
import s from './Profile.module.css'

export function Profile() {
  const profileName = useAppSelector<string>(state => state.profile.name)
  const email = useAppSelector<string>(state => state.profile.email)
  const avatar = useAppSelector(state => state.profile.avatar)
  const isAuthMe = useAppSelector(state => state.login.isAuthMe)
  const loadingStatus = useAppSelector(state => state.app.status)
  const isLoading = loadingStatus === 'loading'
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onImageError = () => {
    toast('ошибка загрузки аватара')
    dispatch(setError('ошибка загрузки аватара'))
  }

  const changeNameHandler = (name: string) => {
    dispatch(updateProfile({ name }))
  }

  const logoutButtonHandler = () => {
    dispatch(setIsLoggedOutTC())
  }

  useEffect(() => {
    if (!isAuthMe) {
      navigate(PATH.LOGIN)
    }
  }, [isAuthMe])

  return (
    <>
      <BackLink />
      <div className={s.container}>
        <div className={s.title}> It-incubator</div>
        <h2 className={s.title}>Personal Infomation</h2>
        <div>
          <div className={s.avatarContainer}>
            <img
              className={s.avatar}
              src={avatar ? avatar : noAvatar}
              alt="avatar"
              onError={onImageError}
            />
            <AddAvatar />
          </div>

          <div>
            <div className={s.minititle}>Nickname</div>
            {/*не нравиться, надо доделать*/}
            <EditableSpan
              value={profileName}
              onChange={name => changeNameHandler(name)}
              disableEditMode={isLoading}
            />

            <div className={s.minititle}>e-mail</div>
            <div>{email}</div>
          </div>
          <div>
            <ButtonWithLoader onClick={logoutButtonHandler} name={'logout'} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </>
  )
}
