import React, { useEffect, useState } from 'react'

import { faEye } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import SuperButton from '../../../common/components/c2-SuperButton/SuperButton'
import { PATH } from '../../../common/components/Routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'

import s from './PasswordNew.module.css'
import { setError, setNewPassword } from './PasswordNewReducer'

type NewPassInputs = {
  password: string
}

export function PasswordNew() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isLoading = useAppSelector(state => state.newPass.isLoading)
  const error = useAppSelector(state => state.newPass.error)
  const success = useAppSelector(state => state.newPass.success)
  const [inputType, setInputType] = useState<string>('password')
  const { token } = useParams()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPassInputs>()

  const togglePasswordViewType = () => {
    setInputType(inputType === 'password' ? 'text' : 'password')
  }

  const onSubmit: SubmitHandler<NewPassInputs> = data => {
    if (token) {
      dispatch(setNewPassword(data.password, token))
    } else {
      dispatch(setError('не верная ссылка'))
    }
  }

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        navigate(PATH.LOGIN)
      }, 1000)
    }
  }, [success])
  if (isLoading) return <div>.крутилка.</div>

  return (
    <div className={s.conteiner}>
      <h1 className={s.title}>Create new password</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type={inputType}
          placeholder={'password'}
          {...register('password', { required: true, maxLength: 100 })}
        />
        {/*иконка глаз*/}
        <FontAwesomeIcon
          className={s.eye}
          onClick={togglePasswordViewType}
          icon={faEye}
          title={inputType === 'password' ? 'see password' : 'hide password'}
        />
        <div className={s.error}>
          {error ? <span>{error}</span> : errors.password && <span>This field is required</span>}
        </div>
        <div className={s.discription}>
          <p>
            Create new password (min 8 characters ) and we will send you further instructions to
            email
          </p>
        </div>
        {success ? (
          <div style={{ color: 'green' }}>password accepted</div>
        ) : (
          <SuperButton type={'submit'}>Create new password</SuperButton>
        )}
      </form>
    </div>
  )
}
