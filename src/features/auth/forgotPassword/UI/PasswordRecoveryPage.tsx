import React from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ButtonWithLoader } from '../../../../common/components/ButtonWithLoader/ButtonWithLoader'
import { PATH } from '../../../../common/components/Routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { sendEmail } from '../forgotPassReducer'

import s from './PasswordRecovery.module.css'

type ForgotInputs = {
  email: string
}

export function PasswordRecoveryPage() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(state => state.forgotPass.isLoading)
  const error = useAppSelector(state => state.forgotPass.error)

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInputs>()

  const onSubmit: SubmitHandler<ForgotInputs> = data => {
    dispatch(sendEmail(data.email))
  }

  const onClickLogin = () => {
    navigate(PATH.LOGIN)
  }

  return (
    <div>
      <h1 className={s.title}>Forgot your password?</h1>

      <form className={s.formForgotPassword} onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder={'email'}
          defaultValue="nya-admin@nya.nya"
          {...register('email', { required: true, maxLength: 100 })}
        />
        <div className={s.error}>
          {error ? <span>{error}</span> : errors.email && <span>This field is required</span>}
        </div>
        <div className={s.discription}>
          <p>Enter your email address and we will send you further instructions </p>
        </div>
        <div>
          <ButtonWithLoader name={'Send Instruction'} isLoading={isLoading} type={'submit'} />
        </div>

        {/*{isLoading ? (*/}
        {/*  <div>.крутилка.</div>*/}
        {/*) : (*/}
        {/*  //<SuperButton type={'submit'}>Send Instruction</SuperButton>*/}
        {/*)}*/}
        <div className={s.discription}>
          <p>Did you remember your password?</p>
        </div>
      </form>

      <a href={''} onClick={onClickLogin}>
        try login
      </a>
    </div>
  )
}
