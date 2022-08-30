import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import { Paginator } from '../../../common/components/paginator/Paginator'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { loadPacks, setQueryParams } from '../packReducer'

import { FilterBlock } from './FilterBlock'
import { TitleBlock } from './TitleBlock'

export const PacksPage = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state.pack.cardPacks)
  const page = useAppSelector(state => state.pack.page)
  const packsPerPage = useAppSelector(state => state.pack.pageCount)
  const totalPacksCount = useAppSelector(state => state.pack.cardPacksTotalCount)

  const param = useAppSelector(state => state.pack.queryParams)

  const totalPacksPagesCount = Math.ceil(totalPacksCount / packsPerPage)

  const addNewPackHandler = () => {
    toast.info('создать пачку')
  }
  const renderData = data.map(pack => {
    return (
      <div key={pack._id}>
        <>
          {pack.user_id} {pack.name} {pack.cardsCount} {pack.created}
        </>
      </div>
    )
  })

  const changeCurrentPage = (newPage: number) => {
    dispatch(setQueryParams({ page: newPage }))
  }
  const changePackPerPage = (newPackPerPage: number) => {
    dispatch(setQueryParams({ pageCount: newPackPerPage }))
  }

  useEffect(() => {
    if (param) dispatch(loadPacks(param))
    toast(JSON.stringify(param))
    toast(page)
  }, [param])

  return (
    <div>
      <TitleBlock
        title={'Pack list'}
        buttonName={'Add new pack'}
        buttonCallback={addNewPackHandler}
        // link={PATH.PACKS}
        // linkName={'Back to pack list'}
      />
      <FilterBlock />
      {renderData}
      <Paginator
        pagesCount={totalPacksPagesCount}
        countPerPage={packsPerPage}
        currentPage={page}
        callbackCurrent={changeCurrentPage}
        callbackCurrentPerPage={changePackPerPage}
      />
    </div>
  )
}
