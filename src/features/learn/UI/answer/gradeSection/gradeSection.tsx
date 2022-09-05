import React, { ChangeEvent, FormEvent, useState } from 'react'

import FormControl from '@mui/material/FormControl/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel/FormControlLabel'
import FormLabel from '@mui/material/FormLabel/FormLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup/RadioGroup'
import { toast } from 'react-toastify'
import { v1 } from 'uuid'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'

type PropsType = {
  onSubmitCallback: (grade: number) => void
}

export const GradeSection = (props: PropsType) => {
  const [ratingValue, setRatingValue] = useState<number>(0)

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

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (ratingValue === 0) {
      toast.warn('make choise', { autoClose: 500 })
    } else {
      props.onSubmitCallback(ratingValue)
    }
  }

  const ratingGroup = rating.map(rating => (
    <FormControlLabel
      key={rating.id}
      value={rating.value}
      control={<Radio />}
      label={rating.name}
      checked={rating.value === ratingValue}
    />
  ))

  return (
    <form onSubmit={onSubmit}>
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
  )
}
