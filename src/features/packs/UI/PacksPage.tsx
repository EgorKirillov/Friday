import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Paginator } from '../../../common/components/paginator/Paginator'
import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { setQueryParamsCards } from '../../cards/cardReducer'
import { ColumnSortPacksName, SortPacksType } from '../packAPI'
import { createPack, deletePack, loadPacks, setQueryParams } from '../packReducer'
import { PackTableContainer } from '../packTable/UI/packTableConteiner'

import { FilterBlock } from './FilterBlock'
import { TitleBlock } from './TitleBlock'

export const PacksPage = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state.pack.cardPacks)
  const page = useAppSelector(state => state.pack.page)
  const packsPerPage = useAppSelector(state => state.pack.pageCount)
  const totalPacksCount = useAppSelector(state => state.pack.cardPacksTotalCount)
  const navigate = useNavigate()
  const param = useAppSelector(state => state.pack.queryParams)

  const totalPacksPagesCount = Math.ceil(totalPacksCount / packsPerPage)

  const addNewPackHandler = () => {
    const index = new Date().getSeconds()

    dispatch(createPack({ name: `пачка-пачка ${index}` }, { ...param, page: 1 }))
    toast.info('создать пачку')
  }

  const deletePackHandler = (id: string) => {
    dispatch(deletePack(id, { ...param, page: 1 }))
    toast.info('удалить пачку')
  }

  const changeCurrentPage = (newPage: number) => {
    dispatch(setQueryParams({ page: newPage }))
  }
  const changePackPerPage = (newPackPerPage: number) => {
    dispatch(setQueryParams({ pageCount: newPackPerPage }))
  }
  const sort = (columnName: ColumnSortPacksName) => {
    // if queryParams sort '^'(up) --> make sort 'v'(down)
    // else all another case  --> make sort '^'(up)
    const value: SortPacksType =
      !!param && param.sortPacks === `1${columnName}` ? `0${columnName}` : `1${columnName}`

    dispatch(setQueryParams({ sortPacks: value }))
  }
  const onClickPack = (packId: string) => {
    dispatch(setQueryParamsCards({ cardsPack_id: packId }))
    navigate(PATH.CARDS)
  }

  const renderData = data.map(pack => {
    return (
      <div key={pack._id}>
        <div onClick={() => onClickPack(pack._id)}>
          {pack.user_id} {pack._id} {pack.name} {pack.cardsCount} {pack.created}
        </div>
      </div>
    )
  })

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
      <button onClick={() => sort('name')}>sort 1 colunm</button>
      <button onClick={() => sort('cardsCount')}>sort 2 colunm</button>
      <button onClick={() => sort('updated')}>sort 3 colunm</button>
      <button onClick={() => sort('user_name')}>sort 4 colunm</button>
      {renderData}
      <PackTableContainer />
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
