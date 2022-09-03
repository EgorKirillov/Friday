import React, { FC, ReactNode, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import style from './ModalWindow.module.css'

type PropsType = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const ModalWindow = (props: PropsType) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.box}>
        <div className={style.header}>
          <div className={style.title}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {props.title}
            </Typography>
          </div>
          <div>
            <button onClick={props.onClose}>X</button>
          </div>
        </div>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>{props.children}</div>
        </Typography>
      </Box>
    </Modal>
  )
}
