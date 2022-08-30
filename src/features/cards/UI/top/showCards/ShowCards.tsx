import React, { useState } from 'react'

import { useAppDispatch } from '../../../../../common/hooks/hooks'

import style from './ShowCards.module.css'

export const ShowCards = () => {
  const dispatch = useAppDispatch()
  const [cards, setCards] = useState('All')
  const onClickHandler = (value: string) => {
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
