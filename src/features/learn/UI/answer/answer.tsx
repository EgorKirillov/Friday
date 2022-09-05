import React, { memo } from 'react'

import { GradeSection } from './gradeSection/gradeSection'

type PropsType = {
  answer: string
  onSubmitCallback: (grade: number) => void
}

export const Answer = memo((props: PropsType) => {
  return (
    <div>
      <p>
        <b>Answer: </b>
        {props.answer}
      </p>
      <GradeSection onSubmitCallback={props.onSubmitCallback} />
    </div>
  )
})
