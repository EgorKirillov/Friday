import React from 'react'

import { Resolver, SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { ButtonWithLoader } from '../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { sendEmail } from '../forgotPassReducer'

import s from './PasswordRecovery.module.css'

type ForgotInputs = {
  email: string
}

const resolver: Resolver<ForgotInputs> = async values => {
  return {
    values: values.email ? values : {},
    errors: !values.email
      ? {
          email: {
            type: 'required',
            message: 'This is required.',
          },
        }
      : {},
  }
}

export const PasswordRecoveryPage = () => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading = loading === 'loading'

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<ForgotInputs>({ resolver })

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
        <div className={s.error}>{errors.email && errors.email.message}</div>
        <div className={s.discription}>
          <p>Enter your email address and we will send you further instructions </p>
        </div>

        <div>
          <ButtonWithLoader name={'Send Instruction'} isLoading={isLoading} type={'submit'} />
        </div>

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
