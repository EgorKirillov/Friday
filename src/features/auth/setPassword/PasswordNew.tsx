import React from 'react'
import SuperButton from '../../../common/components/c2-SuperButton/SuperButton'
import { SubmitHandler, useForm } from 'react-hook-form'
import { sendEmail } from '../forgotPassword/forgotPassReducer'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import s from './PasswordNew.module.css'
import { PasswordNewAPI } from './passwordNewAPI'
import { setNewPassword } from './PasswordNewReducer'

type NewPassInputs = {
  password: string
}

export function PasswordNew() {
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector((state) => state.newPass.isLoading)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPassInputs>()

  const onSubmit: SubmitHandler<NewPassInputs> = (data) => {
    const pathname = document.location.pathname.split('/')
    const token = pathname[pathname.length - 1]

    console.log(token)

    // alert(data.password)
    // dispatch(sendEmail(data.password))
    dispatch(setNewPassword(data.password, token))
  }
  return (
    <div className={s.conteiner}>
      <h1 className={s.title}>Create new password</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="password"
          placeholder={'password'}
          {...register('password', { required: true, maxLength: 100 })}
        />
        <div className={s.error}>
          {/*{error ? <span>{error}</span> : errors.email && <span>This field is required</span>}*/}
        </div>
        <div className={s.discription}>
          <p>Create new password and we will send you further instructions to email</p>
        </div>
        {isLoading ? (
          <div>.крутилка.</div>
        ) : (
          <SuperButton type={'submit'}>Create new password</SuperButton>
        )}
      </form>
    </div>
  )
}
