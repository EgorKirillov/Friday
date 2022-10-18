import React from 'react'

import TextField from '@mui/material/TextField/TextField'

type PropsType = {
  question: string
  handleChangeQuestion: (event: React.ChangeEvent<HTMLInputElement>) => void
  answer: string
  handleChangeAnswer: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const QuestionsAndAnswersInText = (props: PropsType) => {
  return (
    <>
      <TextField
        label={'Question'}
        variant="standard"
        value={props.question}
        onChange={props.handleChangeQuestion}
      />
      <TextField
        label={'Answer'}
        variant="standard"
        value={props.answer}
        onChange={props.handleChangeAnswer}
      />
    </>
  )
}
