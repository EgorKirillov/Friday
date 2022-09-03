import React, { useState } from 'react'

import { toast } from 'react-toastify'

import editIcon from '../../../../assets/svg/Edit.svg'
import { ModalWindow } from '../../../../common/components/modalWindow/ModalWindow'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { updatePack } from '../../packReducer'
import { EditPack } from '../modalWindowComponents/editPack/EditPack'

type UpdatePackType = {
  idPack: string
}
export const UpdatePack = (props: UpdatePackType) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const dispatch = useAppDispatch()
  const status = useAppSelector(state => state.app.status)
  const name = useAppSelector(
    state => state.pack.cardPacks.filter(pack => pack._id === props.idPack)[0].name
  )
  const onClickEdit = () => {
    toast.info(`edit ${props.idPack}`)
    toast.info(`${name}`)
    handleOpen()
  }
  const saveNewName = (newName: string, checked: boolean) => {
    const updatedPack = {
      _id: props.idPack,
      private: checked,
      name: newName,
    }

    dispatch(updatePack(updatedPack))
    if (status === 'succeeded') {
      handleClose()
    }
  }

  return (
    <div>
      <img src={editIcon} alt="" onClick={onClickEdit} style={{ margin: '0 5px', width: 'auto' }} />
      <ModalWindow title={'Edit pack'} open={open} onClose={handleClose}>
        <EditPack name={name} saveNewName={saveNewName} />
      </ModalWindow>
    </div>
  )
}
