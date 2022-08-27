import * as React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { green } from '@mui/material/colors'

type PropsType = {
  size?: 'small' | 'medium' | 'large'
  color?: string
  name?: string
  isLoading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
}

export const ButtonWithLoader = ({
  size = 'medium',
  name = 'default',
  isLoading = false,
  onClick = () => {},
  type = 'button',
}: PropsType) => {
  const handleButtonClick = () => {
    onClick()
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          variant="contained"
          disabled={isLoading}
          onClick={handleButtonClick}
          size={size}
          type={type}
        >
          {name}
        </Button>
        {isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: green[500],
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px',
            }}
          />
        )}
      </Box>
    </Box>
  )
}
