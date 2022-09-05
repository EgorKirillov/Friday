import { setStatusLoading } from '../../app/appStatusReducer'
import { AppThunk } from '../../app/store'
import { handleError } from '../../common/utils/handleError'
import { updateCardGrade } from '../cards/cardReducer'
import { cardsAPI, CardType } from '../cards/cardsAPI'

const initialState: InitialStateLearnType = {
  card: {} as CardType,
  showAnswer: false,
}

export const learnReducer = (
  state: InitialStateLearnType = initialState,
  action: LearnActionsType
): InitialStateLearnType => {
  switch (action.type) {
    case 'learn/SET-CARD':
      return { ...state, card: { ...action.payload } }
    case 'learn/SET-SHOW-ANSWER':
      return { ...state, showAnswer: action.showAnswer }
    default:
      return state
  }
}

// actions
export const setCard = (data: CardType) => ({ type: 'learn/SET-CARD', payload: data } as const)
export const setShowAnswer = (showAnswer: boolean) =>
  ({ type: 'learn/SET-SHOW-ANSWER', showAnswer } as const)

// thunks

export const gradeCard =
  (grade: number, card_id: string): AppThunk =>
  async dispatch => {
    try {
      dispatch(setStatusLoading('loading'))
      const res = await cardsAPI.gradeCard(grade, card_id)

      dispatch(setShowAnswer(false))
      // update grade card in state
      dispatch(
        updateCardGrade(
          res.data.updatedGrade.card_id,
          res.data.updatedGrade.grade,
          res.data.updatedGrade.shots
        )
      )
      dispatch(setStatusLoading('succeeded'))
    } catch (e) {
      handleError(e, dispatch)
    }
  }

// types
export type LearnActionsType = ReturnType<typeof setCard> | ReturnType<typeof setShowAnswer>

export type InitialStateLearnType = {
  card: CardType
  showAnswer: boolean
}
