import React from 'react'
import logo from '../../../assets/img/itIncubatorLOGO.png'
import s from './Header.module.css'
import SuperButton from '../c2-SuperButton/SuperButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../Routing/SwitchRoutes'

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
