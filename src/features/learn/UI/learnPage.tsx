import React, { ChangeEvent, FormEvent, useState } from 'react'

import { FormControlLabel, RadioGroup } from '@mui/material'
import FormControl from '@mui/material/FormControl/FormControl'
import FormLabel from '@mui/material/FormLabel/FormLabel'
import Radio from '@mui/material/Radio'
import { toast } from 'react-toastify'
import { v1 } from 'uuid'

import { setError } from '../../../app/appStatusReducer'
import { ButtonWithLoader } from '../../../common/components/buttonWithLoader/ButtonWithLoader'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { BackLink } from '../../cards/UI/backLink/BackLink'

import { Answer } from './answer/answer'
import s from './learnPage.module.css'
import { Question } from './question/question'

export const LearnPack = () => {
  const cards = useAppSelector(state => state.cards.cards)
  const packName = useAppSelector(state => state.cards.packName)
  const cardsLenght = cards.length
  const card = cards[0]
  const [ratingValue, setRatingValue] = useState<number>(0)
  const [showAnswer, setShowAnswer] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const showAnswerHandler = () => {
    setShowAnswer(true)
    toast('show answer')
  }
  const showNextHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (ratingValue === 0) {
      toast.error('make choise')
    } else setShowAnswer(false)
    toast('next ' + ratingValue)
  }
  const rating = [
    { id: v1(), value: 1, name: 'Did not know' },
    { id: v1(), value: 2, name: 'Forgot' },
    { id: v1(), value: 3, name: 'A lot of thought' },
    { id: v1(), value: 4, name: 'Confused' },
    { id: v1(), value: 5, name: 'Knew the answer' },
  ]

  const onChangeRate = (event: ChangeEvent<HTMLInputElement>) => {
    setRatingValue(+event.target.value)
  }
  const ratingGroup = rating.map(rating => {
    return (
      <FormControlLabel
        key={rating.id}
        value={rating.value}
        control={<Radio />}
        label={rating.name}
        checked={rating.value === ratingValue}
      />
    )
  })

  return (
    <>
      <BackLink />
      <h2 className={s.title}>Learn {packName}</h2>

      <div className={s.container}>
        <div>
          <b>Question:</b> <span>{card.question}</span>
        </div>
        <div>
          <p>Количество попыток ответов на вопрос: {card.shots}</p>
        </div>
        {showAnswer ? (
          <>
            <div>
              <p>
                <b>Answer: </b>
                {card.answer}
              </p>
            </div>

            <form onSubmit={showNextHandler}>
              <FormControl>
                <FormLabel id="rateGroupRadioButtons">Rate yourself:</FormLabel>
                <RadioGroup
                  aria-labelledby="rateGroupRadioButtons"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={onChangeRate}
                >
                  {ratingGroup}
                </RadioGroup>
              </FormControl>
              <ButtonWithLoader name={'Next'} type={'submit'} />
            </form>
          </>
        ) : (
          <ButtonWithLoader name={'Show answer'} onClick={showAnswerHandler} />
        )}
        {/*<Question />*/}
        {/*<Answer />*/}
        {/*<ButtonWithLoader name={'Next'} onClick={showNextHandler} />*/}
      </div>
    </>
  )
}
