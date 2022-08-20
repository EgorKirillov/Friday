import React from 'react'
import logo from '../../../assets/img/itIncubatorLOGO.png'
import s from './Header.module.css'
import SuperButton from '../c2-SuperButton/SuperButton'

export function Header() {
  return (
    <div className={s.headerConteiner}>
      <img className={s.logo} src={logo} alt="" />
      <SuperButton>Sigh in</SuperButton>
    </div>
  )
}
