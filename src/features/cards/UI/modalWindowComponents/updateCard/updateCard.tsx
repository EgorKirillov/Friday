import React from 'react'

import { ModalWindow } from '../../../../../common/components/modalWindow/ModalWindow'
import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import { changeCardModalStatus, updateCard } from '../../../cardReducer'

import { ContentUpdateCard } from './contentUpdateCard'

export const UpdateCard = () => {
  const open = useAppSelector(state => state.cards.modalEdit)
  const idCard = useAppSelector(state => state.cards.idEditCard)
  const oldQuestion = useAppSelector(state => state.cards.oldQuestion)
  const oldAnswer = useAppSelector(state => state.cards.oldAnswer)

  const dispatch = useAppDispatch()

  const closeModal = () => dispatch(changeCardModalStatus('modalEdit', false))

  const editCardHandler = (valueQuestion: string, valueAnswer: string) => {
    const newCard = { _id: idCard, answer: valueAnswer, question: valueQuestion }

    dispatch(updateCard(newCard))
  }

  return (
    <div>
      <ModalWindow title={'Edit card'} open={!!open} onClose={closeModal}>
        <ContentUpdateCard
          callBack={editCardHandler}
          onClose={closeModal}
          question={oldQuestion}
          answer={oldAnswer}
        />
      </ModalWindow>
    </div>
  )
}
