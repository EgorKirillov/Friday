import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { loadPacks } from '../../../packs/packReducer'

import { FilterBlock } from './FilterBlock'
import { TitleBlock } from './TitleBlock'

export const PacksPage = () => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(state => state.pack.cardPacks)
  const param = useAppSelector(state => state.pack.queryParams)

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

  useEffect(() => {
    if (param) dispatch(loadPacks(param))
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
    </div>
  )
}
