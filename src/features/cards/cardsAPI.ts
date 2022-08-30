import { instance } from '../../app/instanceAPI'

export const cardsAPI = {
  getCards(param: QueryParameterCardsType) {
    return instance.get<GetCardsResponseType>('/cards/pack', { params: param })
  },
  createCard(newCard: NewCardType) {
    const data = { card: newCard }

    return instance.post<CreateCardResponseType>('/cards/pack', data)
  },
  deleteCard(idCard: string) {
    return instance.delete<DeleteCardResponseType>(`/cards/pack/?id=${idCard}`)
  },
  updateCard(updatedCard: UpdatedCardType) {
    const data = { card: updatedCard }

    return instance.put<UpdatecardResponseType>(`/cards/pack`, data)
  },
}

//types
export type CardType = {
  _id: string
  cardsPack_id: string
  user_id: string
  answer: string
  question: string
  grade: number
  shots: number
  questionImg: string
  answerImg: string
  answerVideo: string
  questionVideo: string
  comments: string
  type: string
  rating: number
  more_id: Date
  created: Date
  updated: Date
  __v: number
}
export type NewCardType = {
  cardsPack_id: string
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
}
export type UpdatedCardType = {
  _id: number
  question?: string
  answer?: string
  grade?: number
  shots?: number
  answerImg?: string
  questionImg?: string
  questionVideo?: string
  answerVideo?: string
  comments?: string
  type?: string
}
export type QueryParameterCardsType = {
  cardsPack_id: string
  cardAnswer?: string // не обязательно
  cardQuestion?: string // не обязательно
  min?: number // не обязательно
  max?: number // не обязательно
  sortCards?: SortCardsType // не обязательно
  page?: number // не обязательно
  pageCount?: number // не обязательно
}

export type GetCardsResponseType = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: Date
  packUpdated: Date
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token: string
  tokenDeathTime: number
}
type CreateCardResponseType = {
  newCard: CardType
  token: string
  tokenDeathTime: number
}
type DeleteCardResponseType = {
  deletedCard: CardType
  token: string
  tokenDeathTime: number
}
type UpdatecardResponseType = {
  updatedCard: CardType
  token: string
  tokenDeathTime: number
}

type SortCardsType =
  | '0answer'
  | '1answer'
  | '0question'
  | '1question'
  | '0updated'
  | '1updated'
  | '0grade'
  | '1grade'
