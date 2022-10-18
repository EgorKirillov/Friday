import React, { useState } from 'react'

import { InputLabel } from '@mui/material'
import Box from '@mui/material/Box/Box'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { QuestionsAndAnswersInPictures } from '../../../../../common/components/modalWindow/content/questionsAndAnswersInPictures/QuestionsAndAnswersInPictures'
import { QuestionsAndAnswersInText } from '../../../../../common/components/modalWindow/content/questionsAndAnswersInText/QuestionsAndAnswersInText'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'
import { useAppSelector } from '../../../../../common/hooks/hooks'
import { NewCardDataType } from '../../../cardsAPI'

type PropsType = {
  onClose: () => void
  callBack: (payload: NewCardDataType) => void
}
export const ContentCreateCard = (props: PropsType) => {
  const isLoading = useAppSelector(state => state.app.status === 'loading')

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [format, setFormat] = useState('Text')
  const [answerImg, setAnswerImg] = useState('')
  const [questionImg, setQuestionImg] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as string)
  }

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value)
  }

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value)
  }

  const onClickHandlerSave = () => {
    props.callBack({ question, answer, questionImg, answerImg })
  }

  const saveQuestionImg = (base64file: string) => {
    setQuestionImg(base64file)
  }

  const saveAnswerImg = (base64file: string) => {
    setAnswerImg(base64file)
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
            <InputLabel id="demo-simple-select-label">Choose a question format</InputLabel>
            <Select
              style={{ marginBottom: '30px' }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={format}
              autoFocus={true}
              label="Choose a question format"
              onChange={handleChange}
            >
              <MenuItem value={'Text'}>Text</MenuItem>
              <MenuItem value={'Picture'}>Picture</MenuItem>
            </Select>

            {format === 'Text' ? (
              <QuestionsAndAnswersInText
                question={question}
                answer={answer}
                handleChangeQuestion={handleChangeQuestion}
                handleChangeAnswer={handleChangeAnswer}
              />
            ) : (
              <QuestionsAndAnswersInPictures
                saveQuestionImg={saveQuestionImg}
                saveAnswerImg={saveAnswerImg}
                questionImg={questionImg}
                answerImg={answerImg}
              />
            )}
          </FormControl>
        </Box>
        <div className={style.buttonsBlock}>
          <ButtonWithLoader
            name={'Cancel'}
            styleButton={'cancel'}
            onClick={props.onClose}
            isLoading={isLoading}
          />
          <ButtonWithLoader
            name={'Save'}
            styleButton={'save'}
            onClick={onClickHandlerSave}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
