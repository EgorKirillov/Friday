import { instance } from '../../app/instanceAPI'

export const packAPI = {
  getCards() {
    return instance.get<GetCardsResponseType>('/cards/pack')
  },
  createCard(newCard: NewCardType) {
    const data = { card: newCard }

    return instance.post<CreateCardResponseType>('/cards/pack', data)
  },
  deleteCard(idPack: string) {
    return instance.delete<DeleteCardResponseType>(`/cards/pack/?id=${idPack}`)
  },
  updateCard(updatedCard: UpdatedCardType) {
    const data = { card: updatedCard }

    return instance.put<UpdatecardResponseType>(`/cards/pack`, data)
  },
}

//types
type CardType = {
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
type NewCardType = {
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
type UpdatedCardType = {
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
type GetCardsResponseType = {
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
