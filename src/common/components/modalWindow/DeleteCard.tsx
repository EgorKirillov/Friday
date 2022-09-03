import React, { useState } from 'react'

import deleteIcon from '../../../assets/svg/Delete.svg'
import { ContentDeleteCard } from '../../../features/cards/UI/modalWindowComponents/deleteCard/ContentDeleteCard'

import { ModalWindow } from './ModalWindow'

export const DeleteCard = () => {
  const [open, setOpen] = useState(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <div>
      <img src={deleteIcon} alt="" style={{ margin: '0 5px', width: 'auto' }} onClick={openModal} />
      <ModalWindow title={'Delete Card'} open={open} onClose={closeModal}>
        <ContentDeleteCard onClose={closeModal} />
      </ModalWindow>
    </div>
  )
}
