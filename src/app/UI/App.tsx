import React, { useEffect } from 'react'

import './App.css'
import LinearProgress from '@mui/material/LinearProgress'

import { DevHeader } from '../../common/components/devHeader/DevHeader'
import { Header } from '../../common/components/header/Header'
import { Preloader } from '../../common/components/loaderCircle/Preloader'
import { SwitchRoutes } from '../../common/components/routing/SwitchRoutes'
import { ToastMessage } from '../../common/components/toast/ToastMessage'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { DEV_VERSION } from '../../config'
import { initializeApp } from '../appStatusReducer'

const App = () => {
  const status = useAppSelector(state => state.app.status)
  const isLoading: boolean = status === 'loading'
  const isInitialize = useAppSelector(state => state.app.isInitialize)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  if (!isInitialize) {
    return <Preloader />
  }

  return (
    <div className="App">
      <ToastMessage />
      {DEV_VERSION && <DevHeader />}
      <Header />
      <LinearProgress color="inherit" sx={{ visibility: isLoading ? 'visible' : 'hidden' }} />
      <SwitchRoutes />
    </div>
  )
}

export default App
