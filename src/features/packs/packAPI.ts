import { instance } from '../../app/instanceAPI'

export const packAPI = {
  getPacks(param: QueryParameterPackType) {
    return instance.get<GetPacksResponseType>(`/cards/pack`, { params: param })
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

export type PackType = {
  _id: string
  user_id: string
  user_name?: string
  private?: boolean
  name: string
  path?: string
  grade?: number //оценка 0..5
  shots?: number // количество попыток обучения
  deckCover?: string
  cardsCount: number
  type?: string
  rating?: number
  created: Date
  updated: Date
  more_id?: string
  __v?: number
}
export type NewPackType = {
  name?: string // если не отправить будет no Name
  deckCover?: string // не обязателен
  private?: boolean // если не отправить будет false
}
export type UpdatedPackType = {
  _id: string
  user_name?: string
  private?: boolean
  name?: string
  path?: string
  grade?: number
  shots?: number
  deckCover?: string
  type?: string
}

export type GetPacksResponseType = {
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

export type QueryParameterPackType = {
  packName: string
  min: number
  max: number
  sortPacks: SortPacksType
  page: number
  pageCount: number
  user_id: string
}

type SortPacksType =
  | '0name'
  | '1name'
  | '0cardsCount'
  | '1cardsCount'
  | '0created'
  | '1created'
  | '0updated'
  | '1updated'
