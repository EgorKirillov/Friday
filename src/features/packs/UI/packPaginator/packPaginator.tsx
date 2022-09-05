import React, { useCallback } from 'react'

import { Paginator } from '../../../../common/components/paginator/Paginator'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setQueryParams } from '../../packReducer'

export const PackPaginator = () => {
  const page = useAppSelector(state => state.pack.page)
  const packsPerPage = useAppSelector(state => state.pack.pageCount)
  const totalPacksCount = useAppSelector(state => state.pack.cardPacksTotalCount)
  const totalPacksPagesCount = Math.ceil(totalPacksCount / packsPerPage)

  const dispatch = useAppDispatch()

  const changeCurrentPage = useCallback(
    (newPage: number) => {
      dispatch(setQueryParams({ page: newPage }))
    },
    [dispatch]
  )

  const changePackPerPage = useCallback(
    (newPackPerPage: number) => {
      dispatch(setQueryParams({ pageCount: newPackPerPage, page: 1 }))
    },
    [dispatch]
  )

  return (
    <Paginator
      pagesCount={totalPacksPagesCount}
      countPerPage={packsPerPage}
      currentPage={page}
      callbackCurrent={changeCurrentPage}
      callbackCurrentPerPage={changePackPerPage}
    />
  )
}
