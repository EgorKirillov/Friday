import React from 'react'

import { ModalWindow } from '../../../../../common/components/modalWindow/ModalWindow'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import { changePackModalStatus, createPack } from '../../../packReducer'

import { ContentCreatePack } from './ContentCreatePack'

export const CreatePack = () => {
  const open = useAppSelector(state => state.pack.modalCreate)

  const dispatch = useAppDispatch()

  const closeModal = () => dispatch(changePackModalStatus('modalCreate', false))

  const createCardHandler = (namePack: string, privatePack: boolean, cover: string) => {
    const newPack = { name: namePack, deckCover: cover, private: privatePack }

    dispatch(createPack(newPack))
  }

  return (
    <div>
      <ModalWindow title={'Add new card'} open={!!open} onClose={closeModal}>
        <ContentCreatePack onClose={closeModal} callBack={createCardHandler} />
      </ModalWindow>
    </div>
  )
}
