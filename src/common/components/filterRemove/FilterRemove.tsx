import React from 'react'

import resetIcon from '../../../assets/img/Filter-Remove.svg'

import style from './FilterRemove.module.css'
type PropsType = {
  callback: () => void
}

export const FilterRemove = ({ callback }: PropsType) => {
  const onClickHandlerFilterRemove = () => {
    callback()
  }

  return (
    <div className={style.filterRemoveContainer}>
      <div className={style.filterRemoveBox} onClick={onClickHandlerFilterRemove}>
        <img src={resetIcon} alt="reset icon" />
      </div>
    </div>
  )
}
