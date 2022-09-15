import React from 'react'

import { ModalWindow } from '../../../../common/components/modalWindow/ModalWindow'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { changePackModalStatus, updatePack } from '../../packReducer'
import { ContentEditPack } from '../modalWindowComponents/editPack/contentEditPack'

export const UpdatePack = () => {
  const open = useAppSelector(state => state.pack.modalEdit)
  const idPack = useAppSelector(state => state.pack.idEditPack)
  const oldName = useAppSelector(state => state.pack.oldName)
  const oldCover = useAppSelector(state => state.pack.oldCover)

  const closeModal = () => dispatch(changePackModalStatus('modalEdit', false))

  const dispatch = useAppDispatch()

  const saveNewName = (newName: string, checked: boolean, deckCover: string) => {
    if (idPack) {
      const updatedPack = {
        _id: idPack,
        private: checked,
        name: newName,
        deckCover: deckCover,
      }

      dispatch(updatePack(updatedPack))
    }
  }

  return (
    <div>
      <ModalWindow title={'Edit pack'} open={!!open} onClose={closeModal}>
        <ContentEditPack
          name={oldName ? oldName : ''}
          handleClose={closeModal}
          saveNewName={saveNewName}
          oldCover={oldCover ? oldCover : ''}
        />
      </ModalWindow>
    </div>
  )
}
