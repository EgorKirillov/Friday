import React, { useState } from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

type PropsType = {
  callBack: (value: string) => void
}

export const SelectAutoWidth = ({ callBack }: PropsType) => {
  const [value, setValue] = useState('4')

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value

    setValue(value)
    callBack(event.target.value)
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
        <InputLabel id="demo-simple-select-autowidth-label"> </InputLabel>
        <Select
          sx={{ width: 69, height: 32 }}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={8}>8</MenuItem>
          <MenuItem value={16}>16</MenuItem>
          <MenuItem value={32}>32</MenuItem>
          <MenuItem value={64}>64</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
