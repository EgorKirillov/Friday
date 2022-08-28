import React, { useEffect, useState } from 'react'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from 'react-router-dom'

import { setError } from '../../../../app/appStatusReducer'
import noAvatar from '../../../../assets/img/avatar.jpg'
import { ButtonWithLoader } from '../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { EditableSpan } from '../../../../common/components/editableSpan/EditableSpan'
import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setIsLoggedOutTC } from '../../login/loginReducer'
import { updateProfile } from '../profileReducer'

import s from './Profile.module.css'

export function Profile() {
  const profileName = useAppSelector<string>(state => state.profile.name)
  const email = useAppSelector<string>(state => state.profile.email)
  const avatar = useAppSelector(state => state.profile.avatar)
  const isAuthMe = useAppSelector(state => state.login.isAuthMe)
  const loadingStatus = useAppSelector(state => state.app.status)
  const isLoadind = loadingStatus === 'loading'
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [srcAvatar, setSrcAvatar] = useState<any>(noAvatar)

  const addPhoto = () => {
    dispatch(
      updateProfile({
        avatar:
          'https://filestore.community.support.microsoft.com/api/images/f2e55cbf-8316-4d3a-9412-ecd8194b2a72?upload=true',
      })
    )
  }

  const onImageError = () => {
    dispatch(setError('ошибка загрузки аватара'))
  }
  const onImageLoad = () => {
    setSrcAvatar(avatar)
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
    <div className={s.container}>
      <div className={s.title}> It-incubator</div>
      <h2 className={s.title}>Personal Infomation</h2>
      <div>
        <div className={s.avatarContainer}>
          <img
            className={s.avatar}
            src={srcAvatar}
            alt=""
            onError={onImageError}
            onLoad={onImageLoad}
          />
          {/*доделать добавление*/}
          {/*<FontAwesomeIcon*/}
          {/*  className={s.eye}*/}
          {/*  onClick={addPhoto}*/}
          {/*  icon={faCamera}*/}
          {/*  title={'change avatar'}*/}
          {/*/>*/}
        </div>

        <div>
          <div className={s.minititle}>Nickname</div>
          {/*не нравиться, надо доделать*/}
          <EditableSpan
            value={profileName}
            onChange={name => changeNameHandler(name)}
            disableEditMode={isLoadind}
          />

          <div className={s.minititle}>e-mail</div>
          <div>{email}</div>
        </div>
        <div>
          <ButtonWithLoader
            onClick={logoutButtonHandler}
            name={'logout я пшел'}
            isLoading={isLoadind}
          />
        </div>
      </div>
    </div>
  )
}
