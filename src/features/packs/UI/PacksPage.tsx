import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { NotFoundResult } from '../../cards/UI/notFoundCards/notFoundResult'
import { changePackModalStatus, loadPacks, setQueryParams } from '../packReducer'

import { FilterBlock } from './filterBlock/FilterBlock'
import { CreatePack } from './modalWindowComponents/createPack/CreatePack'
import { DeletePack } from './modalWindowComponents/deletePack/DeletePack'
import { PackPaginator } from './packPaginator/packPaginator'
import { PackTableContainer } from './packTable/packTableConteiner'
import { TitleBlock } from './titleBlock/TitleBlock'
import { UpdatePack } from './updatePack/updatePack'

export const PacksPage = () => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading = loading === 'loading'
  const isAuth = useAppSelector(state => state.login.isAuthMe)
  const packsCount = useAppSelector(state => state.pack.cardPacksTotalCount)
  const packQueryParam = useAppSelector(state => state.pack.queryParams)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const notFound: boolean = !isLoading && packsCount === 0 && !!packQueryParam

  const addNewPackHandler = () => {
    dispatch(changePackModalStatus('modalCreate', true))
  }

  const clearFilterHandler = () => {
    dispatch(
      setQueryParams({
        user_id: undefined,
        max: undefined,
        min: undefined,
        packName: undefined,
        page: 1,
        pageCount: 4,
      })
    )
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
      <FilterBlock clearFilter={clearFilterHandler} />
      {packsCount !== 0 && <PackTableContainer />}

      {notFound && (
        <NotFoundResult
          isLoading={isLoading}
          buttonName={'clear filter'}
          buttonCallback={clearFilterHandler}
        />
      )}

      {!notFound && <PackPaginator />}

      {/*modals*/}
      <UpdatePack />
      <CreatePack />
      <DeletePack />
    </div>
  )
}
