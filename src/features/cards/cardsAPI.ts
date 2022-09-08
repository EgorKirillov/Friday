import { instance } from '../../app/instanceAPI'

export const cardsAPI = {
  getCards(param: QueryParameterCardsType) {
    return instance.get<GetCardsResponseType>('/cards/card', { params: param })
  },
  createCard(newCard: NewCardType) {
    return instance.post<CreateCardResponseType>('/cards/card', { card: newCard })
  },
  deleteCard(idCard: string) {
    return instance.delete<DeleteCardResponseType>(`/cards/card/?id=${idCard}`)
  },
  updateCard(updatedCard: UpdatedCardType) {
    return instance.put<UpdatecardResponseType>(`/cards/card`, { card: updatedCard })
  },
  gradeCard(grade: number, card_id: string) {
    return instance.put<updatedGradeResponseType>(`/cards/grade`, { grade, card_id })
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
  updated: string
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
  _id: string
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

export type GradedCardType = {
  _id: string
  cardsPack_id: string
  card_id: string
  user_id: string
  grade: number
  shots: number
  more_id: string
  created: string
  updated: string
  __v: number
}

export type QueryParameterCardsType = {
  cardsPack_id: string // ОБЯЗАТЕЛЬНОЕ!!!
  cardAnswer?: string // не обязательно
  cardQuestion?: string // не обязательно
  min?: number // не обязательно
  max?: number // не обязательно
  sortCards?: SortCardsType // не обязательно
  page?: number // не обязательно
  pageCount?: number // не обязательно
}

export type ColumnSortCardsName = 'answer' | 'question' | 'updated' | 'grade'

export type SortCardsType = `0${ColumnSortCardsName}` | `1${ColumnSortCardsName}`

//Response Types
export type GetCardsResponseType = {
  cards: CardType[]
  packUserId: string
  packName: string
  packPrivate: boolean
  packDeckCover: string
  packCreated: string //Date
  packUpdated: string //Date
  page: number
  pageCount: number
  cardsTotalCount: number
  minGrade: number
  maxGrade: number
  token?: string
  tokenDeathTime?: number
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

type updatedGradeResponseType = {
  updatedGrade: GradedCardType
  token: string
  tokenDeathTime: number
}
