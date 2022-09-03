import React, { FC, ReactNode } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import style from './ModalWindow.module.css'

type PropsType = {
  title: string
  onClose: () => void
  open: boolean
  children: ReactNode
}

export const ModalWindow: FC<PropsType> = ({ title, children, open, onClose }) => {
  // const [open, setOpen] = useState(false) // переносим в контейнерную компоненту
  // const handleOpen = () => setOpen(true) //  переносим в контейнерную компоненту
  const handleClose = () => onClose()

  return (
    <div>
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
              <button onClick={handleClose}>X</button>
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
