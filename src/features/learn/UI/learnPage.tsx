import React from 'react'

import { ButtonWithLoader } from '../../../common/components/buttonWithLoader/ButtonWithLoader'
import { useAppSelector } from '../../../common/hooks/hooks'
import { BackLink } from '../../cards/UI/backLink/BackLink'

import { Answer } from './answer/answer'
import s from './learnPage.module.css'
import { Question } from './question/question'

export const LearnPack = () => {
  const packs = useAppSelector(state => state.pack.cardPacks)

  return (
    <>
      <BackLink />
      <h2 className={s.title}>Learn “Pack Name”</h2>

      <div className={s.container}>
        <Question />

        <Answer />

        <ButtonWithLoader name={'Next'} />
      </div>
    </>
  )
}
