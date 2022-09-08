import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { changePackModalStatus, loadPacks } from '../packReducer'

import { FilterBlock } from './filterBlock/FilterBlock'
import { CreatePack } from './modalWindowComponents/createPack/CreatePack'
import { DeletePack } from './modalWindowComponents/deletePack/DeletePack'
import { PackPaginator } from './packPaginator/packPaginator'
import { PackTableContainer } from './packTable/packTableConteiner'
import { TitleBlock } from './titleBlock/TitleBlock'
import { UpdatePack } from './updatePack/updatePack'

export const PacksPage = () => {
  const isAuth = useAppSelector(state => state.login.isAuthMe)
  const packsCount = useAppSelector(state => state.pack.cardPacksTotalCount)
  const packQueryParam = useAppSelector(state => state.pack.queryParams)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addNewPackHandler = () => {
    dispatch(changePackModalStatus('modalCreate', true))
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
      {packsCount !== 0 && <PackTableContainer />}
      <PackPaginator />

      {/*modals*/}
      <UpdatePack />
      <CreatePack />
      <DeletePack />
    </div>
  )
}
