import React from 'react'
import s from './PasswordRecovery.module.css'
import SuperButton from '../../../common/components/c2-SuperButton/SuperButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../common/components/Routing/SwitchRoutes'
import SuperInputText from '../../../common/components/c1-SuperInputText/SuperInputText'

export function PasswordRecovery() {
  const navigate = useNavigate()

  const onClickLogin = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <div className={s.conteiner}>
      <div className={s.title}>It-incubator</div>
      <h1 className={s.title}>Forgot your password?</h1>

      <form>
        <SuperInputText type="email" placeholder={'email'} />
        <div className={s.discription}>
          <p>Enter your email address and we will send you further instructions </p>
        </div>
        <SuperButton>Send Instruction</SuperButton>
        <div className={s.discription}>
          <p>Did you remember your password?</p>
        </div>
      </form>

      <a href={''} onClick={onClickLogin}>
        try logIn
      </a>
    </div>
  )
}
