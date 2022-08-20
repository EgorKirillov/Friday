import React from 'react'
import { HashRouter } from 'react-router-dom'
import DevHeader from '../../common/components/DevHeader/DevHeader'
import SwitchRoutes from '../../common/components/Routing/SwitchRoutes'
import { Header } from './Header'

export function StartPage() {
  return (
    <div>
      <HashRouter>
        <DevHeader />
        <Header />
        <SwitchRoutes />
      </HashRouter>
    </div>
  )
}
