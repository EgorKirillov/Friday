import React from 'react'

import { useNavigate } from 'react-router-dom'

import { ModalWindow } from '../../../../../common/components/modalWindow/ModalWindow'
import { PATH } from '../../../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import { changePackModalStatus, deletePack, setIdPack, setNamePack } from '../../../packReducer'

import { ContentDeletePack } from './ContentDeletePack'

export const DeletePack = () => {
  const open = useAppSelector(state => state.pack.modalDelete)
  const idPack = useAppSelector(state => state.pack.tempIdCard)
  const namePack = useAppSelector(state => state.pack.packName)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const closeModal = () => {
    dispatch(changePackModalStatus('modalDelete', false))
    dispatch(setIdPack(''))
    dispatch(setNamePack(''))
  }

  const deletePackHandler = () => {
    if (idPack) {
      dispatch(deletePack(idPack, () => navigate(PATH.PACKS)))
    }
    dispatch(setIdPack(''))
  }

  return (
    <div>
      <ModalWindow title={'Delete Pack'} open={!!open} onClose={closeModal}>
        <ContentDeletePack close={closeModal} callBack={deletePackHandler} name={namePack} />
      </ModalWindow>
    </div>
  )
}
