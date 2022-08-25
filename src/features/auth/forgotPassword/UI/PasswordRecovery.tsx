import React, { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setSuccess } from '../forgotPassReducer'

import { CheckEmailPage } from './CheckEmailPage'
import s from './PasswordRecovery.module.css'
import { PasswordRecoveryPage } from './PasswordRecoveryPage'

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
