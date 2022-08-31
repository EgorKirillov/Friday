import React from 'react'

import logo from '../../../assets/img/itIncubatorLOGO.png'

import { BlockAvaName } from './aaa/BlockAvaName'
import s from './Header.module.css'

export function Header() {
  return (
    <div className={s.headerContainer}>
      <img className={s.logo} src={logo} alt="" />
      <BlockAvaName />
    </div>
  )
}
