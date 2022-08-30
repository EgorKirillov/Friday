import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import { setQueryParams } from '../../../../packs/packReducer'

import style from './ShowCards.module.css'

export const ShowCards = () => {
  const dispatch = useAppDispatch()
  const [cards, setCards] = useState<'All' | 'My'>('All')

  const myID = useAppSelector(state => state.profile._id)

  const onClickHandler = (value: 'All' | 'My') => {
    if (value === 'My') {
      dispatch(setQueryParams({ user_id: myID }))
    } else {
      dispatch(setQueryParams({ user_id: undefined })) // проверить чтобы работали запросы
    }
    setCards(value)
    //dispatch()
  }

  return (
    <div className={style.showCardsContainer}>
      <div className={style.label}>Show packs cards</div>
      <div className={style.showCardsBox}>
        <div
          className={`${style.cards} ${cards === 'My' ? style.activeCards : ''}`}
          onClick={() => onClickHandler('My')}
        >
          My
        </div>
        <div
          className={`${style.cards} ${cards === 'All' ? style.activeCards : ''}`}
          onClick={() => onClickHandler('All')}
        >
          All
        </div>
      </div>
    </div>
  )
}
