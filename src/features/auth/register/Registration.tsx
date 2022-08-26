import React, { useEffect } from 'react'

import { SubmitHandler, useForm } from 'react-hook-form'
import { NavLink, useNavigate } from 'react-router-dom'

import SuperButton from '../../../common/components/c2-SuperButton/SuperButton'
import s from '../../../common/components/DevHeader/DevHeader.module.css'
import { PATH } from '../../../common/components/Routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'

import style from './registation.module.css'
import { registerTC, setRegisterErrorAC } from './registerReducer'

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
    <div className={style.container}>
      <div className={style.form}>
        <h2>Sing Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label className={style.nameForm}>Email</label>
            </div>
            <div>
              <input {...register('email')} placeholder="Email" type={'email'} />
              {errors?.email && <p>{errors.email.message}</p>}
            </div>
          </div>
          <div>
            <div>
              <label className={style.nameForm}>Password</label>
            </div>
            <div>
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
            </div>
            {errors.password1 && <p>{errors.password1.message}</p>}
            {/*{errors.password1 && <p>This field is required</p>}*/}
          </div>
          <div>
            <label className={style.nameForm}>Confirm password</label>
            <div>
              <input
                {...register('password2', { required: true, minLength: 8 })}
                placeholder="repeat password"
                type={'password'}
              />
            </div>
            {errors.password2 && <p>This field is required</p>}
          </div>
          <div className={style.error}> {errorMessage && <div>{errorMessage}</div>}</div>

          <div>
            {isLoading ? <div>КРУТИЛКА</div> : isRegistered && <div>Вы зарегистрированы </div>}
            <SuperButton type="submit">Sing Up</SuperButton>
          </div>

          <div>Already have an account?</div>
          <NavLink className={s.link} to={PATH.LOGIN}>
            Sing In{' '}
          </NavLink>
        </form>
      </div>
    </div>
  )
}
