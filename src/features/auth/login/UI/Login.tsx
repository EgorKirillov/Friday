import React from 'react'

import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { LoginDataType } from '../loginAPI'
import { setUserTC } from '../loginReducer'

import style from './Login.module.css'

export const Login = () => {
  const isAuthMe = useAppSelector(state => state.login.isAuthMe)
  const status = useAppSelector(state => state.app.status)
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginDataType>()

  const onSubmit = (data: LoginDataType) => {
    dispatch(setUserTC(data))
  }

  const onClickNavigateForgotPassword = () => {
    navigate(PATH.RECOVERY_PASSWORD)
  }
  const onClickNavigateRegistration = () => {
    navigate(PATH.REGISTRATION)
  }

  if (isAuthMe) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div className={style.loginWrapper}>
      <h2>Sign in</h2>
      <div className={style.loginForms}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.loginInputForm}>
            <div className={style.loginLabel}>
              <label>Email</label>
            </div>
            <input
              style={{ width: '80%' }}
              {...register('email')}
              placeholder="Email"
              type={'email'}
              disabled={status === 'loading'}
            />
            <hr />
          </div>
          <div className={style.loginInputForm}>
            <div className={style.loginLabel}>
              <label>Password</label>
            </div>
            <input
              {...register('password')}
              placeholder="Password"
              type={'password'}
              disabled={status === 'loading'}
            />
            <hr />
          </div>

          <div className={style.loginInputFormCheckbox}>
            <input type="checkbox" {...register('rememberMe')} disabled={status === 'loading'} />
            <label>Remember me</label>
          </div>

          <div className={style.navigate}>
            <a onClick={onClickNavigateForgotPassword}>Forgot Password?</a>
          </div>

          <input
            className={status !== 'loading' ? style.button : style.buttonDisabled}
            type="submit"
            value={'Sign in'}
            disabled={status === 'loading'}
          />
          <p>Already have an account?</p>
          <a className={style.navigateToRegistration} onClick={onClickNavigateRegistration}>
            Sign Up
          </a>
        </form>
      </div>
    </div>
  )
}
