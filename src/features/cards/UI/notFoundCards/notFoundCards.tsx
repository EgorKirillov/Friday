import React from 'react'

import { ButtonWithLoader } from '../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setQueryParamsCards } from '../../cardReducer'

export const NotFoundCards = () => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading: boolean = loading === 'loading'

  const queryParams = useAppSelector(state => state.cards.queryParams)
  const dispatch = useAppDispatch()

  const clearCardFilterHandler = () => {
    dispatch(
      setQueryParamsCards({ ...queryParams, cardAnswer: undefined, cardQuestion: undefined })
    )
  }

  return (
    <div>
      <h3>Not found</h3>
      <ButtonWithLoader
        name={'clear filter'}
        onClick={clearCardFilterHandler}
        size={'small'}
        isLoading={isLoading}
      />
    </div>
  )
}
