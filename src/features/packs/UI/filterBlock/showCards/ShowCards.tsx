import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import { setQueryParams } from '../../../packReducer'

import style from './ShowCards.module.css'

export const ShowCards = () => {
  const dispatch = useAppDispatch()
  const [cards, setCards] = useState<'All' | 'My'>('All')
  const status = useAppSelector(state => state.app.status)

  const myID = useAppSelector(state => state.profile._id)

  const onClickHandler = (value: 'All' | 'My') => {
    if (value === 'My') {
      dispatch(setQueryParams({ user_id: myID, min: undefined, max: undefined }))
    } else {
      dispatch(setQueryParams({ user_id: undefined, min: undefined, max: undefined }))
    }
    setCards(value)
    //dispatch()
  }

  return (
    <div className={style.showCardsContainer}>
      <div className={style.label}>Show packs cards</div>
      <div className={style.showCardsBox}>
        <button
          disabled={status === 'loading'}
          className={`${style.cards} ${cards === 'My' ? style.activeCards : ''}`}
          onClick={() => onClickHandler('My')}
        >
          My
        </button>
        <button
          disabled={status === 'loading'}
          className={`${style.cards} ${cards === 'All' ? style.activeCards : ''}`}
          onClick={() => onClickHandler('All')}
        >
          All
        </button>
      </div>
    </div>
  )
}
