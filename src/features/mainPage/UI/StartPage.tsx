import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import DevHeader from '../../../common/components/DevHeader/DevHeader'
import SwitchRoutes from '../../../common/components/Routing/SwitchRoutes'
import { Header } from '../../../common/components/Header/Header'

export function StartPage() {
  return (
    <div>
      <BrowserRouter>
        <DevHeader />
        <Header />
        <SwitchRoutes />
      </BrowserRouter>
    </div>
  )
}
