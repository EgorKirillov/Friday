import { instance } from '../../app/instanceAPI'

export const packAPI = {
  getPacks() {
    return instance.get<GetPacksResponseType>('/cards/pack')
  },
  createPack(newPack: NewPackType) {
    const data = { cardsPack: newPack }

    return instance.post<CreatePackResponseType>('/cards/pack', data)
  },
  deletePack(idPack: string) {
    return instance.delete<DeletePackResponseType>(`/cards/pack/?id=${idPack}`)
  },
  updatePack(updatedPack: UpdatedPackType) {
    const data = { cardsPack: updatedPack }

    return instance.put<UpdatePackResponseType>(`/cards/pack`, data)
  },
}

type PackType = {
  _id: string
  user_id: string
  user_name?: string
  private?: boolean
  name: string
  path?: string
  grade?: number
  shots?: number
  deckCover?: string
  cardsCount: number
  type?: string
  rating?: number
  created: Date
  updated: Date
  more_id?: string
  __v?: number
}
type NewPackType = {
  name?: string // если не отправить будет no Name
  deckCover?: string // не обязателен
  private?: boolean // если не отправить будет false
}
type UpdatedPackType = {
  _id: number
  user_name?: string
  private?: boolean
  name?: string
  path?: string
  grade?: number
  shots?: number
  deckCover?: string
  type?: string
}

type GetPacksResponseType = {
  cardPacks: PackType[]
  cardPacksTotalCount: number
  maxCardsCount: number
  minCardsCount: number
  page: number
  pageCount: number
  token?: string
  tokenDeathTime?: number
}
type CreatePackResponseType = {
  newCardsPack: PackType
  token?: string
  tokenDeathTime?: number
}
type DeletePackResponseType = {
  deletedCardsPack: PackType
  token?: string
  tokenDeathTime?: number
}

type UpdatePackResponseType = {
  updatedCardsPack: PackType
  token?: string
  tokenDeathTime?: number
}
