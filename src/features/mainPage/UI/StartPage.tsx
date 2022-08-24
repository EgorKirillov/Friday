import React from 'react'
import DevHeader from '../../../common/components/DevHeader/DevHeader'
import SwitchRoutes from '../../../common/components/Routing/SwitchRoutes'
import { Header } from '../../../common/components/Header/Header'

export function StartPage() {
  return (
    <div>
      <DevHeader />
      <Header />
      <SwitchRoutes />
    </div>
  )
}
