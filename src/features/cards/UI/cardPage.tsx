import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { DeletePack } from '../../packs/UI/modalWindowComponents/deletePack/DeletePack'
import { TitleBlock } from '../../packs/UI/titleBlock/TitleBlock'
import { changeCardModalStatus, loadCards } from '../cardReducer'

import { BackLink } from './backLink/BackLink'
import s from './cardPage.module.css'
import { CardsPaginator } from './cardsPaginator/cardsPaginator'
import { CardTableContainer } from './cardsTable/cardTableConteiner'
import { CreateCard } from './modalWindowComponents/createCard/CreateCard'
import { DeleteCard } from './modalWindowComponents/deleteCard/DeleteCard'
import { NotFoundCards } from './notFoundCards/notFoundCards'
import { PackIsEmpty } from './packIsEmpty/packIsEmpty'
import { SearchBlock } from './searchBlock/SearchBlock'

export const CardsPage = () => {
  const queryParams = useAppSelector(state => state.cards.queryParams)
  const titlePack = useAppSelector(state => state.cards.packName)
  const loading = useAppSelector(state => state.app.status)
  const isLoading = loading === 'loading'

  const userId = useAppSelector(state => state.profile._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const isMyPack: boolean = userId === packUserId
  const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
  const cardName = useAppSelector(state => state.cards.cardName)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const packIsEmpty: boolean =
    totalCardsCount === 0 && !queryParams.cardAnswer && !queryParams.cardQuestion

  const notFound: boolean =
    totalCardsCount === 0 && (!!queryParams.cardAnswer || !!queryParams.cardQuestion)

  const addNewCardHandler = () => dispatch(changeCardModalStatus('modalCreate', true))

  const learnPackHandler = () => {
    dispatch(loadCards({ cardsPack_id: queryParams.cardsPack_id, pageCount: totalCardsCount }))
    navigate(PATH.LEARN)
  }

  useEffect(() => {
    if (queryParams) dispatch(loadCards(queryParams))
    toast(JSON.stringify(queryParams)) // dev help
  }, [queryParams])

  return (
    <div className={s.container}>
      <BackLink />

      <TitleBlock
        title={titlePack}
        isMyPack={isMyPack}
        buttonVisability={totalCardsCount === 0 ? 'hidden' : 'visible'}
        buttonName={isMyPack ? 'Add new card' : 'learn pack'}
        buttonCallback={isMyPack ? addNewCardHandler : learnPackHandler}
      />

      <SearchBlock />

      <CardTableContainer />

      {!isLoading && packIsEmpty && (
        <PackIsEmpty callback={addNewCardHandler} isMyPack={isMyPack} />
      )}

      {!isLoading && notFound && <NotFoundCards />}

      <CardsPaginator />

      {/*//модалки*/}
      <DeletePack />
      <CreateCard key={queryParams.cardsPack_id} idPack={queryParams.cardsPack_id} />
      <DeleteCard cardName={cardName} />
    </div>
  )
}
