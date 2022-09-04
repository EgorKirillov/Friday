import React, { useState } from 'react'

import deleteIcon from '../../../../../assets/svg/Delete.svg'
import { ModalWindow } from '../../../../../common/components/modalWindow/ModalWindow'

import { ContentDeleteCard } from './ContentDeleteCard'

type PropsType = {
  callBack: () => void
  namePack: string | undefined
}

export const DeleteCard = (props: PropsType) => {
  const [open, setOpen] = useState(false)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  return (
    <div>
      <img src={deleteIcon} alt="" style={{ margin: '0 5px', width: 'auto' }} onClick={openModal} />
      <ModalWindow title={'Delete Card'} open={open} onClose={closeModal}>
        <ContentDeleteCard
          onClose={closeModal}
          callBack={props.callBack}
          namePack={props.namePack}
        />
      </ModalWindow>
    </div>
  )
}
