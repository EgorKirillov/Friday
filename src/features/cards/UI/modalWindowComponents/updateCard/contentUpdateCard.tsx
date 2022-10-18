import React, { useState } from 'react'

import Box from '@mui/material/Box/Box'
import FormControl from '@mui/material/FormControl'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { QuestionsAndAnswersInPictures } from '../../../../../common/components/modalWindow/content/questionsAndAnswersInPictures/QuestionsAndAnswersInPictures'
import { QuestionsAndAnswersInText } from '../../../../../common/components/modalWindow/content/questionsAndAnswersInText/QuestionsAndAnswersInText'
import { SelectData } from '../../../../../common/components/modalWindow/content/selectData/SelectData'
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

  const saveQuestionImg = () => {}
  const saveAnswerImg = () => {}
  const questionImg = ''
  const answerImg = ''

  const [changeQuestion, setChangeQuestion] = useState(props.question)
  const [changeAnswer, setChangeAnswer] = useState(props.answer)
  const [formatData, setFormatData] = useState('Text')

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeQuestion(event.currentTarget.value)
  }
  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeAnswer(event.currentTarget.value)
  }
  const handleChangeFormatData = (formatData: string) => {
    setFormatData(formatData)
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
            <SelectData callBack={handleChangeFormatData} />
            {formatData === 'Text' ? (
              <QuestionsAndAnswersInText
                question={changeQuestion}
                answer={changeAnswer}
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
