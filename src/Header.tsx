import React from 'react'
import {NavLink} from 'react-router-dom'
import s from "./Header.module.css"
import {PATH} from "./SwitchRoutes";


// export const PATH = {
//     LOGIN: '/login', //логинизация
//     REGISTRATION: '/reg', //регистрация
//     PROFILE: '/profile', //профайл
//     ERROR404: '/error404', // не найдено
//     RECOVERY_PASSWORD: '/password_recovery', //восстановление пароля
//     NEW_PASSWORD: '/new_password', //ввод нового пароля
//     TESTS: '/tests',  //тестовая -отобразить / продемонстрировать все SuperКопмоненты
//}


function Header() {

    return (
                <div className={s.conteiner}>
                    <NavLink className={s.link} to={PATH.LOGIN}>login </NavLink>
                    <NavLink className={s.link} to={PATH.REGISTRATION}>registration </NavLink>
                    <NavLink className={s.link} to={PATH.PROFILE}>profile </NavLink>
                    <NavLink className={s.link} to={PATH.RECOVERY_PASSWORD}>Password_recovery </NavLink>
                    <NavLink className={s.link} to={PATH.NEW_PASSWORD}>New_password </NavLink>
                    <NavLink className={s.link} to={PATH.TESTS}>tests </NavLink>
                    
       
                    <div className={s.block}> </div>
                </div>
    )
}

export default Header
