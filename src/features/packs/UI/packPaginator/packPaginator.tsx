import React from 'react'

import { Paginator } from '../../../../common/components/paginator/Paginator'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setQueryParams } from '../../packReducer'

export const PackPaginator = () => {
  const page = useAppSelector(state => state.pack.page)
  const packsPerPage = useAppSelector(state => state.pack.pageCount)
  const totalPacksCount = useAppSelector(state => state.pack.cardPacksTotalCount)
  const totalPacksPagesCount = Math.ceil(totalPacksCount / packsPerPage)

  const dispatch = useAppDispatch()

  const changeCurrentPage = (newPage: number) => {
    dispatch(setQueryParams({ page: newPage }))
  }

  const changePackPerPage = (newPackPerPage: number) => {
    dispatch(setQueryParams({ pageCount: newPackPerPage, page: 1 }))
  }

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
