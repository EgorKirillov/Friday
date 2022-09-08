import React from 'react'

import { ModalWindow } from '../../../../../common/components/modalWindow/ModalWindow'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import { changeCardModalStatus, createCard } from '../../../cardReducer'

import { ContentCreateCard } from './ContentCreateCard'

type PropsType = {
  idPack: string
}

export const CreateCard = (props: PropsType) => {
  const open = useAppSelector(state => state.cards.modalCreate)

  const dispatch = useAppDispatch()

  const closeModal = () => dispatch(changeCardModalStatus('modalCreate', false))

  const createCardHandler = (valueQuestion: string, valueAnswer: string) => {
    const newCard = { cardsPack_id: props.idPack, answer: valueAnswer, question: valueQuestion }

    dispatch(createCard(newCard))
  }

  return (
    <div>
      <ModalWindow title={'Create Card'} open={!!open} onClose={closeModal}>
        <ContentCreateCard onClose={closeModal} callBack={createCardHandler} />
      </ModalWindow>
    </div>
  )
}
