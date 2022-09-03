import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { createPack, loadPacks } from '../packReducer'

import { FilterBlock } from './filterBlock/FilterBlock'
import { PackPaginator } from './packPaginator/packPaginator'
import { PackTableContainer } from './packTable/packTableConteiner'
import { TitleBlock } from './titleBlock/TitleBlock'

export const PacksPage = () => {
  const isAuth = useAppSelector(state => state.login.isAuthMe)

  const packQueryParam = useAppSelector(state => state.pack.queryParams)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const addNewPackHandler = () => {
    const newName = `pack name ${new Date().getSeconds()}` // generate different value

    dispatch(createPack({ name: newName }, { ...packQueryParam, page: 1 })) // go to first page list, maybe need reset param?
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

      <PackPaginator />
    </div>
  )
}
