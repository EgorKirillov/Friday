import React from 'react'

import { useNavigate } from 'react-router-dom'

import imgEmail from '../../../../assets/img/emailSend.svg'
import SuperButton from '../../../../common/components/c2-SuperButton/SuperButton'
import { PATH } from '../../../../common/components/Routing/SwitchRoutes'
import { useAppSelector } from '../../../../common/hooks/hooks'

import s from './PasswordRecovery.module.css'

export function CheckEmailPage() {
  const email = useAppSelector(state => state.forgotPass.email)
  const navigate = useNavigate()

  const onClickHandler = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <>
      <h1 className={s.title}>Check Email</h1>
      <img src={imgEmail} alt={'image email'} width={150} height={150} />
      <div className={s.discription}>
        <p>
          We’ve sent an Email with instructions to
          <br /> {email}
        </p>
      </div>

      <SuperButton type={'button'} onClick={onClickHandler}>
        Back to login
      </SuperButton>
    </>
  )
}
