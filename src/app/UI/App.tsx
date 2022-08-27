import React, { useEffect } from 'react'

import './App.css'
import LinearProgress from '@mui/material/LinearProgress'

import DevHeader from '../../common/components/DevHeader/DevHeader'
import { Header } from '../../common/components/Header/Header'
import { Preloader } from '../../common/components/LoaderCircle/Preloader'
import SwitchRoutes from '../../common/components/Routing/SwitchRoutes'
import { ToastMesssage } from '../../common/components/Toast/ToastMesssage'
import { useAppDispatch, useAppSelector } from '../../common/hooks/hooks'
import { initializeTC } from '../appStatusReducer'

const App = () => {
  const status = useAppSelector(state => state.app.status)
  const isInitialize = useAppSelector(state => state.app.isInitialize)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeTC())
  }, [])

  return (
    <div className="App">
      <ToastMesssage />
      <DevHeader />
      <Header />
      {status === 'loading' && <LinearProgress color="inherit" />}
      {!isInitialize ? <Preloader /> : <SwitchRoutes />}
    </div>
  )
}

export default App
