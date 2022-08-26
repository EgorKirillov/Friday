import React, { useEffect } from 'react'

import { CircularProgress } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'

import DevHeader from '../../../common/components/DevHeader/DevHeader'
import { Header } from '../../../common/components/Header/Header'
import SwitchRoutes from '../../../common/components/Routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'

import { initializeTC } from './startPageReducer'

export function StartPage() {
  const status = useAppSelector(state => state.startPage.status)
  const dispatch = useAppDispatch()
  const isInitialize = useAppSelector(state => state.startPage.isInitialize)

  useEffect(() => {
    dispatch(initializeTC())
  }, [])

  return (
    <div>
      <DevHeader />
      <Header />
      {status === 'loading' && <LinearProgress color="inherit" />}

      {!isInitialize ? (
        <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
          <CircularProgress />
        </div>
      ) : (
        <SwitchRoutes />
      )}
    </div>
  )
}
