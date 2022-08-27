import React, { useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import SuperButton from '../../../../common/components/superButton/SuperButton'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { registerTC, setRegisterErrorAC } from '../registerReducer'

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
  const isLoading = useAppSelector(state => state.register.isLoading)

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

  const onSubmit: SubmitHandler<RegistrationType> = data => {
    if (data.email && data.password1 && data.password2) {
      if (data.password1 === data.password2) {
        const res = { email: data.email, password: data.password1 }

        dispatch(registerTC(res))
      } else {
        dispatch(setRegisterErrorAC('Passwords must match'))
      }
    }
  }

  useEffect(() => {
    if (isRegistered) {
      setTimeout(() => {
        navigate(PATH.LOGIN)
      }, 6000)
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
              type={'password'}
            />
            <hr />
          </div>
          {errors.password1 && <p>{errors.password1.message}</p>}
          {/*{errors.password1 && <p>This field is required</p>}*/}

          <div className={style.registerInputForm}>
            <div className={style.registerLabel}>
              <label>Confirm password</label>
            </div>
            <input
              {...register('password2', { required: true, minLength: 8 })}
              placeholder="confirm password"
              type={'password'}
            />
            <hr />
          </div>
          {errors.password2 && <p>This field is required</p>}
          <div className={style.error}> {errorMessage && <div>{errorMessage}</div>}</div>

          <div>
            {isLoading ? <div>КРУТИЛКА</div> : isRegistered && <div>Вы зарегистрированы </div>}
            <SuperButton className={style.button} type="submit">
              Sing Up
            </SuperButton>
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
