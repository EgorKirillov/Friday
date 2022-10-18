import React, { useState } from 'react'

import { InputLabel } from '@mui/material'
import FormControl from '@mui/material/FormControl/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type PropsType = {
  callBack: (formatData: string) => void
}

export const SelectData = (props: PropsType) => {
  const [format, setFormat] = useState('Text')

  const handleChange = (event: SelectChangeEvent) => {
    setFormat(event.target.value as string)
    props.callBack(event.target.value)
  }

  return (
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
    </FormControl>
  )
}
