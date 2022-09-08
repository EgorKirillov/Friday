import React from 'react'

import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import Input from '@mui/material/Input'
import InputLabel from '@mui/material/InputLabel'

type PropsType = {
  name: string
  setName: (e: string) => void
}

export const ModalWindowInput = (props: PropsType) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setName(event.currentTarget.value)
  }

  return (
    <div>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
      >
        <FormControl variant="standard" style={{ width: '98%' }}>
          <InputLabel htmlFor="component-simple">Name Pack</InputLabel>
          <Input id="component-simple" value={props.name} onChange={handleChange} />
        </FormControl>
      </Box>
    </div>
  )
}
