import React from 'react'

import { useNavigate } from 'react-router-dom'

import logo from '../../../assets/img/itIncubatorLOGO.png'
import { setIsLoggedOutTC } from '../../../features/auth/login/login-reducer'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import SuperButton from '../c2-SuperButton/SuperButton'
import { PATH } from '../Routing/SwitchRoutes'

import s from './Header.module.css'

export function Header() {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const onClickHandlerNavigateToLogin = () => {
    navigate(PATH.LOGIN)
  }
  const onClickHandlerLogOut = () => {
    dispatch(setIsLoggedOutTC())
  }

  return (
    <div className={s.headerContainer}>
      <img className={s.logo} src={logo} alt="" />
      {!isLoggedIn ? (
        <SuperButton onClick={() => onClickHandlerNavigateToLogin()}>Sigh in</SuperButton>
      ) : (
        <SuperButton onClick={() => onClickHandlerLogOut()}>Sigh out</SuperButton>
      )}
    </div>
  )
}
