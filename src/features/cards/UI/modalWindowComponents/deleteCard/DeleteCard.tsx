import React from 'react'

import { ModalWindow } from '../../../../../common/components/modalWindow/ModalWindow'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import { changeCardModalStatus, deleteCard, setQuestionCard, setIdCard } from '../../../cardReducer'

import { ContentDeleteCard } from './ContentDeleteCard'

type PropsType = {
  callBack?: () => void
  cardName: string
}

export const DeleteCard = (props: PropsType) => {
  const open = useAppSelector(state => state.cards.modalDelete)
  const dispatch = useAppDispatch()
  const idCard = useAppSelector(state => state.cards.tempIdCard)

  const closeModal = () => {
    dispatch(changeCardModalStatus('modalDelete', false))
    dispatch(setIdCard(''))
    dispatch(setQuestionCard(''))
  }

  const deleteCardHandler = () => {
    dispatch(deleteCard(idCard))
  }

  return (
    <div>
      <ModalWindow title={'Delete Card'} open={!!open} onClose={closeModal}>
        <ContentDeleteCard
          onClose={closeModal}
          callBack={deleteCardHandler}
          name={props.cardName}
        />
      </ModalWindow>
    </div>
  )
}
