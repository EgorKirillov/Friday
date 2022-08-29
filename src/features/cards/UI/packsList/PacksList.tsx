import React from 'react'

import { useAppDispatch } from '../../../../common/hooks/hooks'
import { DoubleSlider } from '../doubleSlider/DoubleSlider'
import { FilterRemove } from '../filterRemove/FilterRemove'
import { Search } from '../search/Search'
import { ShowCards } from '../showCards/ShowCards'

import style from './PacksList.module.css'

export const PacksList = () => {
  const dispatch = useAppDispatch()
  const onClickHandlerAddNewPack = () => {
    //dispatch()
  }

  return (
    <div className={style.packsListContainer}>
      <div className={style.upper}>
        <div className={style.label}>Packs List</div>
        <button className={style.button} onClick={onClickHandlerAddNewPack}>
          Add new pack
        </button>
      </div>

      <div className={style.settingsContainer}>
        <Search />
        <DoubleSlider />
        <ShowCards />
        <FilterRemove />
      </div>
    </div>
  )
}
