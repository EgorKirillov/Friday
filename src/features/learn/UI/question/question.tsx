import React, { memo } from 'react'
type PropsType = {
  questionText: string
  shots: number
}

export const Question = memo((props: PropsType) => {
  console.log('render question')

  return (
    <>
      <div>
        <b>Question:</b> <span>{props.questionText}</span>
      </div>
      <div>
        <p>Количество попыток ответов на вопрос: {props.shots}</p>
      </div>
    </>
  )
})
