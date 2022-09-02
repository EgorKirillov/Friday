import React from 'react'

import { Route, Routes } from 'react-router-dom'

import { PasswordRecovery } from '../../../features/auth/forgotPassword/UI/PasswordRecovery'
import { Login } from '../../../features/auth/login/UI/Login'
import { Profile } from '../../../features/auth/profile/UI/Profile'
import { Registration } from '../../../features/auth/register/UI/Registration'
import { PasswordNew } from '../../../features/auth/setPassword/UI/PasswordNew'
import { CardsPage } from '../../../features/cards/UI/cardPage'
import { PacksPage } from '../../../features/packs/UI/PacksPage'
import s from '../../container.module.css'
import Error404Page from '../pageNotFound/Error404Page'
import { TestsPage } from '../testPage/TestsPage'

export const PATH = {
  LOGIN: '/login', //логинизация
  REGISTRATION: '/reg', //регистрация
  PROFILE: '/profile', //профайл
  ERROR404: '/error404', // не найдено
  RECOVERY_PASSWORD: '/password_recovery', //восстановление пароля
  NEW_PASSWORD: '/new_password/:token', //ввод нового пароля
  TESTS: '/tests', //тестовая -отобразить / продемонстрировать все SuperКопмоненты
  PACKS: '/packs',
  CARDS: '/cards',
}

export const SwitchRoutes = () => {
  return (
    <div className={s.container}>
      <Routes>
        <Route path={'/'} element={<Login />} />
        <Route path={PATH.LOGIN} element={<Login />} />
        <Route path={PATH.REGISTRATION} element={<Registration />} />
        <Route path={PATH.PROFILE} element={<Profile />} />
        <Route path={PATH.RECOVERY_PASSWORD} element={<PasswordRecovery />} />
        <Route path={PATH.NEW_PASSWORD} element={<PasswordNew />} />
        <Route path={PATH.TESTS} element={<TestsPage />} />
        <Route path={PATH.PACKS} element={<PacksPage />} />
        <Route path={PATH.CARDS} element={<CardsPage />} />
        <Route path={'/*'} element={<Error404Page />} />
      </Routes>
    </div>
  )
}
