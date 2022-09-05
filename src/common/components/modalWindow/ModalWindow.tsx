import React, { ReactNode } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import { useAppSelector } from '../../hooks/hooks'

import style from './ModalWindow.module.css'

type PropsType = {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export const ModalWindow = (props: PropsType) => {
  const status = useAppSelector(state => state.app.status)

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
            <button onClick={props.onClose} disabled={status === 'loading'}>
              X
            </button>
          </div>
        </div>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div>{props.children}</div>
        </Typography>
      </Box>
    </Modal>
  )
}
