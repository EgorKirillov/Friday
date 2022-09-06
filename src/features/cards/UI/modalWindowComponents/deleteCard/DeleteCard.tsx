import React from 'react'

import { ModalWindow } from '../../../../../common/components/modalWindow/ModalWindow'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import { changeCardModalStatus, deleteCard } from '../../../cardReducer'

import { ContentDeleteCard } from './ContentDeleteCard'

type PropsType = {
  callBack?: () => void
  name?: string
  idCard: string
}

export const DeleteCard = (props: PropsType) => {
  const open = useAppSelector(state => state.cards.modalDelete)

  const dispatch = useAppDispatch()

  const closeModal = () => dispatch(changeCardModalStatus('modalDelete', false))

  const deleteCardHandler = () => dispatch(deleteCard(props.idCard))

  return (
    <div>
      <ModalWindow title={'Delete Card'} open={!!open} onClose={closeModal}>
        <ContentDeleteCard onClose={closeModal} callBack={deleteCardHandler} name={props.name} />
      </ModalWindow>
    </div>
  )
}
