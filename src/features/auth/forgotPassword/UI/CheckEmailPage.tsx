import React from 'react'
import s from './PasswordRecovery.module.css'
import SuperButton from '../../../../common/components/c2-SuperButton/SuperButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../common/components/Routing/SwitchRoutes'
import { useAppSelector } from '../../../../common/hooks/hooks'
import imgEmail from '../../../../assets/img/emailSend.svg'

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
