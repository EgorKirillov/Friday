import React from 'react'

import { DoubleSlider } from './doubleSlider/DoubleSlider'
import s from './FilterBlock.module.css'
import { FilterRemove } from './filterRemove/FilterRemove'
import { Search } from './search/Search'
import { ShowCards } from './showCards/ShowCards'

export const FilterBlock = () => {
  return (
    <div className={s.container}>
      <Search />
      <ShowCards />
      <DoubleSlider />
      <FilterRemove />
    </div>
  )
}
