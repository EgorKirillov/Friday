import React from 'react'

import logo from '../../../assets/img/itIncubatorLOGO.png'

import styleContainer from './../../container.module.css'
import { BlockBasicMenu } from './blockBasicMenu/BlockBasicMenu'
import s from './Header.module.css'

export function Header() {
  return (
    <div className={s.header}>
      <div className={styleContainer.container}>
        <div className={s.wrapper}>
          <img className={s.logo} src={logo} alt="" />
          <BlockBasicMenu />
        </div>
      </div>
    </div>
  )
}
