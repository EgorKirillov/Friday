import React, { ReactNode, useState } from 'react'

import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Typography from '@mui/material/Typography'

import deleteIcon from '../../../../assets/svg/Delete.svg'
import style from '../../../../common/components/modalWindow/ModalWindow.module.css'

type PropsType = {
  name: string
  title: string
  children: ReactNode
}

export const DeletePack = (props: PropsType) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const onClickHandlerCloseModalWindow = () => setOpen(false)

  return (
    <div>
      <img
        src={deleteIcon}
        alt=""
        onClick={handleOpen}
        style={{ margin: '0 5px', width: 'auto' }}
      />
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
                {props.title}
              </Typography>
            </div>
            <div>
              <button onClick={onClickHandlerCloseModalWindow}>X</button>
            </div>
          </div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div>{props.children}</div>
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
