import React from 'react'

import { Paginator } from '../../../../common/components/paginator/Paginator'
import { useAppSelector, useAppDispatch } from '../../../../common/hooks/hooks'
import { setQueryParamsCards } from '../../cardReducer'

export const CardsPaginator = () => {
  const queryParams = useAppSelector(state => state.cards.queryParams)

  const pageCard = useAppSelector(state => state.cards.page)
  const packsPerPage = useAppSelector(state => state.cards.pageCount)
  const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
  const totalCardsPagesCount = Math.ceil(totalCardsCount / packsPerPage)

  const dispatch = useAppDispatch()

  const changeCurrentPage = (newPage: number) => {
    dispatch(setQueryParamsCards({ ...queryParams, page: newPage }))
  }

  const changePackPerPage = (newPackPerPage: number) => {
    dispatch(setQueryParamsCards({ ...queryParams, pageCount: newPackPerPage, page: 1 }))
  }

  return (
    <Paginator
      pagesCount={totalCardsPagesCount}
      countPerPage={packsPerPage}
      currentPage={pageCard}
      callbackCurrent={changeCurrentPage}
      callbackCurrentPerPage={changePackPerPage}
    />
  )
}
