import React, { useState } from 'react'

import Box from '@mui/material/Box/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField/TextField'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'
import { useAppSelector } from '../../../../../common/hooks/hooks'

type PropsType = {
  onClose: () => void
  callBack: (valueQuestion: string, valueAnswer: string) => void
  question: string
  answer: string
}
export const ContentUpdateCard = (props: PropsType) => {
  const status = useAppSelector(state => state.app.status)

  const [changeQuestion, setChangeQuestion] = useState(props.question)
  const [changeAnswer, setChangeAnswer] = useState(props.answer)

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeQuestion(event.currentTarget.value)
  }

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeAnswer(event.currentTarget.value)
  }

  const onClickHandlerSave = () => {
    props.callBack(changeQuestion, changeAnswer)
  }

  return (
    <div>
      <div className={style.content}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl variant="standard" style={{ width: '98%' }}>
            <TextField
              label={'Question'}
              variant="filled"
              focused
              value={changeQuestion}
              onChange={handleChangeQuestion}
            />
            <TextField
              label={'Answer'}
              variant="standard"
              value={changeAnswer}
              onChange={handleChangeAnswer}
            />
          </FormControl>
        </Box>
        <div className={style.buttonsBlock}>
          <ButtonWithLoader
            name={'Cancel'}
            styleButton={'cancel'}
            onClick={props.onClose}
            isLoading={status === 'loading'}
          />
          <ButtonWithLoader
            name={'Save'}
            styleButton={'save'}
            onClick={onClickHandlerSave}
            isLoading={status === 'loading'}
          />
        </div>
      </div>
    </div>
  )
}
