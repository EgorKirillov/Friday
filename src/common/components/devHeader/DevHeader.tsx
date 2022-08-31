import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../routing/SwitchRoutes'

import s from './DevHeader.module.css'

// export const PATH = {
//     LOGIN: '/login', //логинизация
//     REGISTRATION: '/reg', //регистрация
//     PROFILE: '/profile', //профайл
//     ERROR404: '/error404', // не найдено
//     RECOVERY_PASSWORD: '/password_recovery', //восстановление пароля
//     NEW_PASSWORD: '/new_password', //ввод нового пароля
//     TESTS: '/tests',  //тестовая -отобразить / продемонстрировать все SuperКопмоненты
//}

export const DevHeader = () => {
  return (
    <div className={s.conteiner}>
      <NavLink className={s.link} to={PATH.LOGIN}>
        login{' '}
      </NavLink>
      <NavLink className={s.link} to={PATH.REGISTRATION}>
        registration{' '}
      </NavLink>
      <NavLink className={s.link} to={PATH.RECOVERY_PASSWORD}>
        Password_recovery{' '}
      </NavLink>
      <NavLink className={s.link} to={PATH.NEW_PASSWORD}>
        New_password{' '}
      </NavLink>
      <NavLink className={s.link} to={PATH.TESTS}>
        tests{' '}
      </NavLink>
      <NavLink className={s.link} to={PATH.PROFILE}>
        profile{' '}
      </NavLink>
      <NavLink className={s.link} to={PATH.PACKS}>
        packs{' '}
      </NavLink>
      <NavLink className={s.link} to={PATH.CARDS}>
        cards{' '}
      </NavLink>
    </div>
  )
}
