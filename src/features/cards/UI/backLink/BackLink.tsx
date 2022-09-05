import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import { useAppSelector } from '../../../../common/hooks/hooks'
type PropsType = {
  callback?: () => void
}

export const BackLink = (props: PropsType) => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading: boolean = loading === 'loading'

  return (
    <div
      style={{
        padding: '5px 0 0 5px',
        textAlign: 'left',
        visibility: isLoading ? 'hidden' : 'visible',
      }}
    >
      <NavLink to={PATH.PACKS} onClick={props.callback}>
        {`<- Back to pack list`}
      </NavLink>
    </div>
  )
}
