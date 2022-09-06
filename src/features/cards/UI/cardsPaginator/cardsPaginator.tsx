import React, { useCallback } from 'react'

import { Paginator } from '../../../../common/components/paginator/Paginator'
import { useAppSelector, useAppDispatch } from '../../../../common/hooks/hooks'
import { setQueryParamsCards } from '../../cardReducer'

export const CardsPaginator = () => {
  const queryParams = useAppSelector(state => state.cards.queryParams)

  const pageCard = useAppSelector(state => state.cards.page)
  const cardsPerPage = useAppSelector(state => state.cards.pageCount)
  const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
  const totalCardsPagesCount = Math.ceil(totalCardsCount / cardsPerPage)

  const dispatch = useAppDispatch()

  const changeCurrentPage = useCallback(
    (newPage: number) => {
      dispatch(setQueryParamsCards({ ...queryParams, page: newPage }))
    },
    [dispatch, queryParams]
  )

  const changePackPerPage = useCallback(
    (newPackPerPage: number) => {
      dispatch(setQueryParamsCards({ ...queryParams, pageCount: newPackPerPage, page: 1 }))
    },
    [dispatch, queryParams]
  )

  return (
    <Paginator
      pagesCount={totalCardsPagesCount}
      countPerPage={cardsPerPage}
      currentPage={pageCard ? pageCard : 1}
      callbackCurrent={changeCurrentPage}
      callbackCurrentPerPage={changePackPerPage}
    />
  )
}
