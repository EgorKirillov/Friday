import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

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
  const isAuth = useAppSelector(state => state.login.isAuthMe)

  const data = useAppSelector(state => state.pack.cardPacks)
  const page = useAppSelector(state => state.pack.page)
  const packsPerPage = useAppSelector(state => state.pack.pageCount)
  const totalPacksCount = useAppSelector(state => state.pack.cardPacksTotalCount)
  const packQueryParam = useAppSelector(state => state.pack.queryParams)
  const totalPacksPagesCount = Math.ceil(totalPacksCount / packsPerPage)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addNewPackHandler = () => {
    const newName = `pack name ${new Date().getSeconds()}` // generate different value

    dispatch(createPack({ name: newName }, { ...packQueryParam, page: 1 })) // go to first page list, maybe need reset param?
  }

  const deletePackHandler = (packId: string) => {
    dispatch(deletePack(packId, { ...packQueryParam }))
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
      !!packQueryParam && packQueryParam.sortPacks === `1${columnName}`
        ? `0${columnName}`
        : `1${columnName}`

    dispatch(setQueryParams({ sortPacks: value }))
  }

  //временно по клику переход на карты
  const onClickPack = (packId: string) => {
    dispatch(setQueryParamsCards({ cardsPack_id: packId }))
    navigate(PATH.CARDS)
  }

  //временно по двойному клику

  const renderData = data.map(pack => {
    return (
      <div key={pack._id}>
        <div style={{ textAlign: 'left' }} onClick={() => onClickPack(pack._id)}>
          {`USERID: ${pack.user_id}  <-> PACKID: ${pack._id}
           <-> PACKNAME:${pack.name}  <-> CARDSCOUNT: ${pack.cardsCount}   <-> DATACREATE:${pack.created}`}
        </div>
      </div>
    )
  })

  useEffect(() => {
    if (packQueryParam) dispatch(loadPacks(packQueryParam))
  }, [packQueryParam])

  useEffect(() => {
    if (!isAuth) navigate(PATH.LOGIN)
  }, [isAuth])

  return (
    <div>
      <TitleBlock
        title={'Pack list'}
        buttonName={'Add new pack'}
        buttonCallback={addNewPackHandler}
      />
      <FilterBlock />

      <button onClick={() => sort('name')}>sort name</button>
      <button onClick={() => sort('cardsCount')}>sort count</button>
      <button onClick={() => sort('updated')}>sort update</button>
      <button onClick={() => sort('user_name')}>sort user Name</button>

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
