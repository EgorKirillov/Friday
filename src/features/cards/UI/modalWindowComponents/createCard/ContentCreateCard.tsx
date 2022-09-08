import React, { useState } from 'react'

import Box from '@mui/material/Box/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField/TextField'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'

type PropsType = {
  onClose: () => void
  callBack: (valueQuestion: string, valueAnswer: string) => void
}
export const ContentCreateCard = (props: PropsType) => {
  const [valueQuestion, setValueQuestion] = useState('')
  const [valueAnswer, setValueAnswer] = useState('')

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueQuestion(event.target.value)
  }

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueAnswer(event.target.value)
  }

  const onClickHandlerSave = () => {
    props.callBack(valueQuestion, valueAnswer)
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
              variant="standard"
              focused
              value={valueQuestion}
              onChange={handleChangeQuestion}
            />
            <TextField
              label={'Answer'}
              variant="standard"
              value={valueAnswer}
              onChange={handleChangeAnswer}
            />
          </FormControl>
        </Box>
        <div className={style.buttonsBlock}>
          <ButtonWithLoader name={'Cancel'} styleButton={'cancel'} onClick={props.onClose} />
          <ButtonWithLoader name={'Save'} styleButton={'save'} onClick={onClickHandlerSave} />
        </div>
      </div>
    </div>
  )
}
