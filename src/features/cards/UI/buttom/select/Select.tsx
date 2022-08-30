import * as React from 'react'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'

import { useAppDispatch } from '../../../../../common/hooks/hooks'

export const SelectAutoWidth = () => {
  const dispatch = useAppDispatch()
  const [age, setAge] = React.useState('10')

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value

    setAge(value)
    //dispatch(....(value))
  }

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
        <InputLabel id="demo-simple-select-autowidth-label"></InputLabel>
        <Select
          sx={{ width: 69, height: 32 }}
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={15}>15</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={25}>25</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
