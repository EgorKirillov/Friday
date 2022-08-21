import React from 'react'
import s from './PasswordRecovery.module.css'
import SuperButton from '../../../../common/components/c2-SuperButton/SuperButton'
import { useNavigate } from 'react-router-dom'
import { PATH } from '../../../../common/components/Routing/SwitchRoutes'
import { SubmitHandler, useForm } from 'react-hook-form'

type ForgotInputs = {
  email: string
}

export function PasswordRecovery() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotInputs>()

  const onSubmit: SubmitHandler<ForgotInputs> = (data) => {
    console.log(data)
  }

  const onClickLogin = () => {
    navigate(PATH.LOGIN)
  }

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
        <SuperButton type={'submit'}>Send Instruction</SuperButton>
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
