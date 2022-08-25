import React from 'react'

import { useNavigate } from 'react-router-dom'

import logo from '../../../assets/img/itIncubatorLOGO.png'
import SuperButton from '../c2-SuperButton/SuperButton'
import { PATH } from '../Routing/SwitchRoutes'

import s from './Header.module.css'

export function Header() {
  const navigate = useNavigate()
  const onClickHandlerNavigateToLogin = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <div className={s.headerConteiner}>
      <img className={s.logo} src={logo} alt="" />
      <SuperButton onClick={() => onClickHandlerNavigateToLogin()}>Sigh in</SuperButton>
    </div>
  )
}
