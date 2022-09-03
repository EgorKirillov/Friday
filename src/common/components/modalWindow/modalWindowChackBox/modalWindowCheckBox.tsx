import React from 'react'

import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

type PropsType = {
  checked: boolean
  setChecked: (e: boolean) => void
}

export const ModalCheckBox = (props: PropsType) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setChecked(event.target.checked)
  }

  return (
    <div>
      <FormControlLabel
        label="Private pack"
        control={
          <Checkbox
            checked={props.checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        }
      />
    </div>
  )
}
