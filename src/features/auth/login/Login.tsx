import React from 'react'

import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'

import { createUserTC } from './login-reducer'
import style from './Login.module.css'
import { LoginDataType } from './loginAPI'

export const Login = () => {
  const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>()

  const onSubmit = (data: LoginDataType) => {
    dispatch(createUserTC(data))
  }

  if (isLoggedIn) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div className={style.loginWrapper}>
      <div className={style.loginName}>Sign in</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email</label>
          <input {...register('email')} placeholder="Email" type={'email'} />
          {errors?.email && <p>{errors.email.message}</p>}
        </div>

        <div>
          <label>Password</label>
          <input {...register('password')} placeholder="Password" type={'password'} />
        </div>

        <div>
          <label>Remember me</label>
          <input type="checkbox" {...register('rememberMe')} />
        </div>
        <input type="submit" value={'Sign in'} />
      </form>
    </div>
  )
}
