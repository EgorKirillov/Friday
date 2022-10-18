import React from 'react'

import { ModalWindow } from '../../../../../common/components/modalWindow/ModalWindow'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import {
  changeCardModalStatus,
  deleteCard,
  setQuestionCard,
  setIdCard,
  setCardImg,
} from '../../../cardReducer'

import { ContentDeleteCard } from './ContentDeleteCard'

type PropsType = {
  callBack?: () => void
  cardName: string
  imgCard?: string
}

export const DeleteCard = (props: PropsType) => {
  const open = useAppSelector(state => state.cards.modalDelete)
  const idCard = useAppSelector(state => state.cards.tempIdCard)

  const dispatch = useAppDispatch()

  const closeModal = () => {
    dispatch(changeCardModalStatus('modalDelete', false))
    dispatch(setIdCard(''))
    dispatch(setQuestionCard(''))
    dispatch(setCardImg('', ''))
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
          imgCard={props.imgCard}
        />
      </ModalWindow>
    </div>
  )
}
