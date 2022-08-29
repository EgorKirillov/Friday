import React from 'react'

import resetIcon from '../../../../../assets/img/Filter-Remove.svg'
import { useAppDispatch } from '../../../../../common/hooks/hooks'

import style from './FilterRemove.module.css'

export const FilterRemove = () => {
  const dispatch = useAppDispatch()

  const onClickHandlerFilterRemove = () => {
    //dispatch()
    // 3 диспатча с 3х редьюсеров сбрасываем значения на дефолтные
  }

  return (
    <div className={style.filterRemoveContainer}>
      <div className={style.filterRemoveBox} onClick={onClickHandlerFilterRemove}>
        <img src={resetIcon} alt="reset icon" />
      </div>
    </div>
  )
}
