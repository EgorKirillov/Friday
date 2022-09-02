import React from 'react'

import { NavLink } from 'react-router-dom'

import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { clearCardsState } from '../../cardReducer'

export const BackLink = () => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading: boolean = loading === 'loading'

  const dispatch = useAppDispatch()

  // проверить работу в useEffect return, возможно удалить
  const clearCardsHandler = () => {
    dispatch(clearCardsState())
  }

  return (
    <div
      style={{
        padding: '5px 0 0 5px',
        textAlign: 'left',
        visibility: isLoading ? 'hidden' : 'visible',
      }}
    >
      <NavLink to={PATH.PACKS} onClick={clearCardsHandler}>
        {`<- Back to pack list`}
      </NavLink>
    </div>
  )
}
