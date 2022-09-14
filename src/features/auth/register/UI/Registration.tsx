import React, { useEffect, useState } from 'react'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { registerTC, setIsRegister, setRegisterError } from '../registerReducer'

import style from './registation.module.css'

type RegistrationType = {
  email?: string
  password1?: string
  password2?: string
}

export function Registration() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isRegistered = useAppSelector(state => state.register.isRegistered) // зарегестрированы мы или нет
  const errorMessage = useAppSelector(state => state.register.error)
  const status = useAppSelector(state => state.app.status)

  const [inputPassword1Type, setInputPassword1Type] = useState<string>('password')
  const [inputPassword2Type, setInputPassword2Type] = useState<string>('password')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationType>({
    defaultValues: {
      email: '',
      password1: '',
      password2: '',
    },
  })

  const togglePassword1ViewType = () => {
    setInputPassword1Type(inputPassword1Type === 'password' ? 'text' : 'password')
  }
  const togglePassword2ViewType = () => {
    setInputPassword2Type(inputPassword2Type === 'password' ? 'text' : 'password')
  }
  const onSubmit: SubmitHandler<RegistrationType> = data => {
    if (data.email && data.password1 && data.password2) {
      if (data.password1 === data.password2) {
        const res = { email: data.email, password: data.password1 }

        dispatch(registerTC(res))
      } else {
        dispatch(setRegisterError('Passwords must match'))
      }
    }
  }

  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => {
        dispatch(setIsRegister(false))
        navigate(PATH.LOGIN)
      }, 2000)
    }
  }, [isRegistered])

  return (
    <div className={style.registerWrapper}>
      <h2>Sing Up</h2>
      <div className={style.registerForms}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.registerInputForm}>
            <div className={style.registerLabel}>
              <label>Email</label>
            </div>
            <input {...register('email')} placeholder="Email" type={'email'} />
            <hr />
          </div>
          {errors?.email && <p>{errors.email.message}</p>}
          <div className={style.registerInputForm}>
            <div className={style.registerLabel}>
              <label>Password</label>
            </div>
            <input
              {...register('password1', {
                required: true,
                minLength: {
                  value: 8,
                  message: 'Minimum length of password should be 8', // JS only: <p>error message</p> TS only support string
                },
              })}
              placeholder="password"
              type={inputPassword1Type === 'password' ? 'password' : ''}
              disabled={status === 'loading'}
            />
            <FontAwesomeIcon
              className={style.eye}
              onClick={togglePassword1ViewType}
              icon={faEye}
              title={inputPassword1Type === 'password' ? 'see password' : 'hide password'}
            />
            <hr />
          </div>
          {errors.password1 && <p>{errors.password1.message}</p>}

          <div className={style.registerInputForm}>
            <div className={style.registerLabel}>
              <label>Confirm password</label>
            </div>
            <input
              {...register('password2', { required: true, minLength: 8 })}
              placeholder="confirm password"
              type={inputPassword2Type === 'password' ? 'password' : ''}
              disabled={status === 'loading'}
            />
            <FontAwesomeIcon
              className={style.eye}
              onClick={togglePassword2ViewType}
              icon={faEye}
              title={inputPassword2Type === 'password' ? 'see password' : 'hide password'}
            />
            <hr />
          </div>
          {errors.password2 && <p>This field is required</p>}
          <div className={style.error}> {errorMessage && <div>{errorMessage}</div>}</div>

          <div>
            {isRegistered && <div>Вы зарегистрированы </div>}
            <input
              className={status !== 'loading' ? style.button : style.buttonDisabled}
              type="submit"
              value={'Sign Up'}
              disabled={status === 'loading'}
            />
          </div>

          <div>Already have an account?</div>
          <NavLink className={style.navigateToLogin} to={PATH.LOGIN}>
            Sing In{' '}
          </NavLink>
        </form>
      </div>
    </div>
  )
}
