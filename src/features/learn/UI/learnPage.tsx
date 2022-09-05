import React, { useCallback, useEffect } from 'react'

import { ButtonWithLoader } from '../../../common/components/buttonWithLoader/ButtonWithLoader'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { getCardFromArray } from '../../../common/utils/getCardfromArray'
import { BackLink } from '../../cards/UI/backLink/BackLink'
import { gradeCard, setCard, setShowAnswer } from '../learnReducer'

import { Answer } from './answer/answer'
import s from './learnPage.module.css'
import { Question } from './question/question'

export const LearnPack = () => {
  const cards = useAppSelector(state => state.cards.cards)
  const card = useAppSelector(state => state.learn.card)

  const packName = useAppSelector(state => state.cards.packName)

  const showAnswer = useAppSelector(state => state.learn.showAnswer)

  const dispatch = useAppDispatch()

  const showAnswerHandler = useCallback(() => {
    dispatch(setShowAnswer(true))
  }, [dispatch])

  const showNextHandler = useCallback(
    (ratingValue: number) => {
      dispatch(gradeCard(ratingValue, card._id))
    },
    [card._id]
  )

  useEffect(() => {
    if (!showAnswer) dispatch(setCard(getCardFromArray(cards)))
  }, [showAnswer])

  return (
    <>
      <BackLink />

      <h2 className={s.title}>Learn {packName}</h2>

      <div className={s.container}>
        <Question questionText={card.question} shots={card.shots} />

        {showAnswer ? (
          <Answer answer={card.answer} onSubmitCallback={showNextHandler} />
        ) : (
          <ButtonWithLoader name={'Show answer'} onClick={showAnswerHandler} />
        )}
      </div>
    </>
  )
}
