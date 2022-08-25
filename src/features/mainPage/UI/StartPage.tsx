import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import DevHeader from '../../../common/components/DevHeader/DevHeader'
import { Header } from '../../../common/components/Header/Header'
import SwitchRoutes from '../../../common/components/Routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'

import { initializeTC } from './startPage-reducer'

export function StartPage() {
  const status = useAppSelector(state => state.startPage.status)
  const dispatch = useAppDispatch()
  const isInitialize = useAppSelector(state => state.startPage.isInitialize)

  useEffect(() => {
    dispatch(initializeTC())
  }, [])

  if (!isInitialize) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <DevHeader />
      <Header />
      {status === 'loading' && <LinearProgress color="inherit" />}
      <SwitchRoutes />
    </div>
  )
}
