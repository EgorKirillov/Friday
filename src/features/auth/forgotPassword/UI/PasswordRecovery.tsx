import React, { useEffect } from 'react'
import s from './PasswordRecovery.module.css'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setSuccess } from '../forgotPassReducer'
import { PasswordRecoveryPage } from './PasswordRecoveryPage'
import { CheckEmailPage } from './CheckEmailPage'

export function PasswordRecovery() {
  const successSendEmail = useAppSelector(state => state.forgotPass.success)
  const error = useAppSelector(state => state.forgotPass.error)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setSuccess(false))
  }, [])

  return (
    <div className={s.conteiner}>
      <div className={s.title}> It-incubator</div>
      {successSendEmail && !error ? <CheckEmailPage /> : <PasswordRecoveryPage />}
    </div>
  )
}
