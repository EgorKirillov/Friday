import React from 'react'

import { FilterRemove } from '../../../../common/components/filterRemove/FilterRemove'
import { Search } from '../../../../common/components/search/Search'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setQueryParams } from '../../packReducer'

import { DoubleSlider } from './doubleSlider/DoubleSlider'
import s from './FilterBlock.module.css'
import { ShowCards } from './showCards/ShowCards'

export const FilterBlock = ({ clearFilter }: { clearFilter: () => void }) => {
  const dispatch = useAppDispatch()

  const startSearchVal = useAppSelector(state => state.pack.queryParams?.packName)

  const setSearchName = (val: string) => {
    dispatch(setQueryParams({ packName: val }))
  }

  return (
    <div className={s.container}>
      <Search callback={setSearchName} startValue={startSearchVal ? startSearchVal : ''} />

      <ShowCards />

      <DoubleSlider />

      <FilterRemove callback={clearFilter} />
    </div>
  )
}
