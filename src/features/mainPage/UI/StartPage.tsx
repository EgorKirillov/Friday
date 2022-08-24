import React from 'react'

import DevHeader from '../../../common/components/DevHeader/DevHeader'
import { Header } from '../../../common/components/Header/Header'
import SwitchRoutes from '../../../common/components/Routing/SwitchRoutes'

export function StartPage() {
  return (
    <div>
      <DevHeader />
      <Header />
      <SwitchRoutes />
    </div>
  )
}
