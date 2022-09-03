import React, { FC, ReactNode, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import style from './ModalWindow.module.css'

type PropsType = {
  name: string
  title: string
  children: ReactNode
}

export const ModalWindow: FC<PropsType> = ({ title, children, name }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onClickHandlerCloseModalWindow = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>{name}</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={style.box}>
          <div className={style.header}>
            <div className={style.title}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {title}
              </Typography>
            </div>
            <div>
              <button onClick={onClickHandlerCloseModalWindow}>X</button>
            </div>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>{children}</div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
