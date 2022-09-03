import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { Paginator } from '../../../common/components/paginator/Paginator'
import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { createPack, loadPacks, setQueryParams } from '../packReducer'

import { FilterBlock } from './filterBlock/FilterBlock'
import { PackTableContainer } from './packTable/packTableConteiner'
import { TitleBlock } from './titleBlock/TitleBlock'

export const PacksPage = () => {
  const isAuth = useAppSelector(state => state.login.isAuthMe)

  const packQueryParam = useAppSelector(state => state.pack.queryParams)

  const page = useAppSelector(state => state.pack.page)
  const packsPerPage = useAppSelector(state => state.pack.pageCount)
  const totalPacksCount = useAppSelector(state => state.pack.cardPacksTotalCount)
  const totalPacksPagesCount = Math.ceil(totalPacksCount / packsPerPage)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addNewPackHandler = () => {
    const newName = `pack name ${new Date().getSeconds()}` // generate different value

    dispatch(createPack({ name: newName })) // go to first page list, maybe need reset param?
  }

  const changeCurrentPage = (newPage: number) => {
    dispatch(setQueryParams({ page: newPage }))
  }

  const changePackPerPage = (newPackPerPage: number) => {
    dispatch(setQueryParams({ pageCount: newPackPerPage, page: 1 }))
  }

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
