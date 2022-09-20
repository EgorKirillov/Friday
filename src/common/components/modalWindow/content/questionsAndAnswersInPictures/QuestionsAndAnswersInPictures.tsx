import React from 'react'

import { InputTypeFile } from '../../../../utils/inputTypeFile'

import style from './QuestionsAndAnswersInPictures.module.css'

type PropsType = {
  saveQuestionImg: (file64: string) => void
  saveAnswerImg: (file64: string) => void
  questionImg: string
  answerImg: string
}

export const QuestionsAndAnswersInPictures = (props: PropsType) => {
  return (
    <div className={style.coverBox}>
      <div className={style.dataBox}>
        <div>Question:</div>
        <div>
          <InputTypeFile callback={props.saveQuestionImg} />
          Change question img
        </div>
      </div>
      <div>
        <img src={props.questionImg} alt="" />
      </div>
      <div className={style.dataBox}>
        <div>Answer:</div>
        <div>
          <InputTypeFile callback={props.saveAnswerImg} />
          Change answer img
        </div>
      </div>
      <div>
        <img src={props.answerImg} alt="" />
      </div>
    </div>
  )
}
