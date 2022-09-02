import React from 'react'

import { useNavigate } from 'react-router-dom'

import logoutIcon from '../../../../assets/img/logInOut_Icon.svg'
import profileIcon from '../../../../assets/img/profile_Icon.svg'
import { setIsAuthMeAC, setIsLoggedOutTC } from '../../../../features/auth/login/loginReducer'
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks'
import { BasicMenu } from '../../basicMenu/BasicMenu'
import { ButtonBasicMenu } from '../../basicMenu/buttonProfile/ButtonBasicMenu'
import { PATH } from '../../routing/SwitchRoutes'

import style from './BlockBasicMenu.module.css'

export const BlockBasicMenu = () => {
  const isAuth = useAppSelector(state => state.login.isAuthMe)
  const dispatch = useAppDispatch()
  const name = useAppSelector(state => state.profile.name)
  const avatar = useAppSelector(state => state.profile.avatar)
  const navigate = useNavigate()

  const onClickHandlerNavigateToProfile = () => {
    navigate(PATH.PROFILE)
  }
  const onClickHandlerNavigateToLogin = () => {
    navigate(PATH.LOGIN)
  }
  const onClickHandlerNavigateToLogout = () => {
    navigate(PATH.LOGIN)
    dispatch(setIsAuthMeAC(false))
    dispatch(setIsLoggedOutTC())
  }

  const buttonProfile = (
    <ButtonBasicMenu icon={profileIcon} name="Profile" callBack={onClickHandlerNavigateToProfile} />
  )
  const buttonLogin = (
    <ButtonBasicMenu icon={logoutIcon} name="Login" callBack={onClickHandlerNavigateToLogin} />
  )
  const buttonLogout = (
    <ButtonBasicMenu icon={logoutIcon} name="Logout" callBack={onClickHandlerNavigateToLogout} />
  )

  const arrButton = [isAuth && buttonProfile, isAuth ? buttonLogout : buttonLogin]

  return (
    <div className={style.headerBlockNameAndAva}>
      <div className={style.name}>{name ? name : 'Unauthorized user'}</div>
      <div className={style.blockBasicMenu}>
        <BasicMenu
          label={<img src={avatar ? avatar : profileIcon} alt="avatar" />}
          items={arrButton}
          style={{ margin: '8px 0 0 -50px' }}
        />
      </div>
    </div>
  )
}
