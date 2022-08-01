import React from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {Registration} from "./components/pages/Registration";
import {Login} from "./components/pages/Login";
import {Profile} from "./components/pages/Profile";
import {PasswordRecovery} from "./components/pages/PasswordRecovery";
import {PasswordNew} from "./components/pages/PasswordNew";
import {TastsPage} from "./components/pages/TestsPage";


export const PATH = {
    LOGIN: '/login', //логинизация
    REGISTRATION: '/reg', //регистрация
    PROFILE: '/profile', //профайл
    ERROR404: '/error404', // не найдено
    RECOVERY_PASSWORD: '/password_recovery', //восстановление пароля
    NEW_PASSWORD: '/new_password', //ввод нового пароля
    TESTS: '/tests',  //тестовая -отобразить / продемонстрировать все SuperКопмоненты
}

function SwitchRoutes() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Navigate to={PATH.ERROR404}/>}/>
                <Route path={PATH.LOGIN} element={<Login/>}/>
                <Route path={PATH.REGISTRATION} element={<Registration/>}/>
                <Route path={PATH.PROFILE} element={<Profile/>}/>
                <Route path={PATH.RECOVERY_PASSWORD} element={<PasswordRecovery/>}/>
                <Route path={PATH.NEW_PASSWORD} element={<PasswordNew/>}/>
                <Route path={PATH.TESTS} element={<TastsPage/>}/>
            </Routes>
        </div>
    )
}

export default SwitchRoutes
