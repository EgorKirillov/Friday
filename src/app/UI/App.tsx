import React, { useEffect } from 'react'

import './App.css'
import LinearProgress from '@mui/material/LinearProgress'

import { DevHeader } from '../../common/components/devHeader/DevHeader'
import { Header } from '../../common/components/header/Header'
import { Preloader } from '../../common/components/loaderCircle/Preloader'
import { SwitchRoutes } from '../../common/components/routing/SwitchRoutes'
import { ToastMessage } from '../../common/components/toast/ToastMessage'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { initializeApp } from '../appStatusReducer'

const App = () => {
  const status = useAppSelector(state => state.app.status)
  const isInitialize = useAppSelector(state => state.app.isInitialize)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeApp())
  }, [])

  return (
    <div className="App">
      <ToastMessage />
      <DevHeader />
      <Header />
      {status === 'loading' && <LinearProgress color="inherit" />}
      {!isInitialize ? <Preloader /> : <SwitchRoutes />}
    </div>
  )
}

export default App
