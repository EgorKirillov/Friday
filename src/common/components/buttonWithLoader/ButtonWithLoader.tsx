import React from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import { grey } from '@mui/material/colors'

import style from './ButtonWithLoader.module.css'

type PropsType = {
  size?: 'small' | 'medium' | 'large'
  color?: string
  name?: string
  isLoading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset' | undefined
  visibility?: 'hidden' | 'visible'
  styleButton?: 'defaultButton' | 'delete' | 'cancel' | 'save'
}

export const ButtonWithLoader = ({
  size = 'medium',
  name = 'default',
  isLoading = false,
  onClick = () => {},
  type = 'button',
  visibility = 'visible',
  styleButton = 'defaultButton',
}: PropsType) => {
  const handleButtonClick = () => {
    onClick()
  }

  const styleButtons = () => {
    if (isLoading) {
      // eslint-disable-next-line no-constant-condition
      if (styleButton === 'delete' || styleButton === 'cancel' || styleButton === 'save') {
        return style.disabledButtonModalWindow
      }
      // eslint-disable-next-line no-constant-condition
      if (styleButton === 'defaultButton') {
        return style.disabledDefaultButton
      }
    }
    if (styleButton === 'delete') {
      return style.deleteButton
    }

    if (styleButton === 'cancel') {
      return style.cancelButton
    }
    if (styleButton === 'save') {
      return style.saveButton
    }
    if (styleButton === 'defaultButton') {
      return style.defaultButton
    }
  }

  const isLoader = () => {
    if (styleButton === 'defaultButton' || styleButton === 'save' || styleButton === 'delete') {
      return true
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        visibility: visibility,
      }}
    >
      <Box sx={{ m: 1, position: 'relative' }}>
        <Button
          className={styleButtons()}
          variant="contained"
          disabled={isLoading}
          onClick={handleButtonClick}
          size={size}
          type={type}
        >
          {name}
        </Button>

        {isLoader() && isLoading && (
          <CircularProgress
            size={24}
            sx={{
              color: grey[500],
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
