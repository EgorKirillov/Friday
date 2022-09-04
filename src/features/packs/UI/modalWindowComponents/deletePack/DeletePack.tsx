import React, { useState } from 'react'

import deleteIcon from '../../../../../assets/svg/Delete.svg'
import { ModalWindow } from '../../../../../common/components/modalWindow/ModalWindow'

import { ContentDeletePack } from './ContentDeletePack'

type PropsType = {
  callBack: () => void
  name: string
}

export const DeletePack = (props: PropsType) => {
  const [open, setOpen] = useState(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <div>
      <img src={deleteIcon} alt="" style={{ margin: '0 5px', width: 'auto' }} onClick={openModal} />
      <ModalWindow title={'Delete Card'} open={open} onClose={closeModal}>
        <ContentDeletePack close={closeModal} callBack={props.callBack} name={props.name} />
      </ModalWindow>
    </div>
  )
}
