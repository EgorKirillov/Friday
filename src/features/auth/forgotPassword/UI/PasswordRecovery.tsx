import React, { useEffect } from 'react'
import s from './PasswordRecovery.module.css'
import SuperButton from '../../../../common/components/c2-SuperButton/SuperButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../common/components/Routing/SwitchRoutes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { sendEmail } from '../forgotPassReducer'

type ForgotInputs = {
  email: string
}

export function PasswordRecovery() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.forgotPass.isLoading)
  const successSendEmail = useAppSelector((state) => state.forgotPass.success)
  const error = useAppSelector((state) => state.forgotPass.error)

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInputs>()

  const onSubmit: SubmitHandler<ForgotInputs> = (data) => {
    console.log(data.email)
    dispatch(sendEmail(data.email))
    console.log(data.email)
  }

  const onClickLogin = () => {
    navigate(PATH.LOGIN)
  }

  useEffect(() => {}, [])
  return (
    <div className={s.conteiner}>
      <div className={s.title}> It-incubator</div>
      <h1 className={s.title}>Forgot your password?</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder={'email'}
          defaultValue="nya-admin@nya.nya"
          {...register('email', { required: true, maxLength: 100 })}
        />
        {errors.email && <span>This field is required</span>}
        <div className={s.discription}>
          <p>Enter your email address and we will send you further instructions </p>
        </div>
        {isLoading ? (
          <div>...крутилка....</div>
        ) : (
          <SuperButton type={'submit'}>Send Instruction</SuperButton>
        )}

        {successSendEmail ? <div>сообщение отправлено</div> : <div>сообщение НЕ отправлено</div>}
        {error ? <div>{error}</div> : <div>ошибок нет</div>}
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
