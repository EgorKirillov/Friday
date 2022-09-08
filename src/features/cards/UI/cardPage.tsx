import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { DeletePack } from '../../packs/UI/modalWindowComponents/deletePack/DeletePack'
import { TitleBlock } from '../../packs/UI/titleBlock/TitleBlock'
import { UpdatePack } from '../../packs/UI/updatePack/updatePack'
import {
  changeCardModalStatus,
  clearCardsState,
  loadCards,
  setQueryParamsCards,
} from '../cardReducer'

import { BackLink } from './backLink/BackLink'
import s from './cardPage.module.css'
import { CardsPaginator } from './cardsPaginator/cardsPaginator'
import { CardTableContainer } from './cardsTable/cardTableConteiner'
import { CreateCard } from './modalWindowComponents/createCard/CreateCard'
import { DeleteCard } from './modalWindowComponents/deleteCard/DeleteCard'
import { UpdateCard } from './modalWindowComponents/updateCard/updateCard'
import { NotFoundResult } from './notFoundCards/notFoundResult'
import { PackIsEmpty } from './packIsEmpty/packIsEmpty'
import { SearchBlock } from './searchBlock/SearchBlock'

export const CardsPage = () => {
  const queryParams = useAppSelector(state => state.cards.queryParams)
  const titlePack = useAppSelector(state => state.cards.packName)
  const loading = useAppSelector(state => state.app.status)
  const isLoading = loading === 'loading'

  const userId = useAppSelector(state => state.profile._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const packId = useAppSelector(state => state.pack.cardPacks)[0]._id

  const isMyPack: boolean = userId === packUserId
  const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
  const cardName = useAppSelector(state => state.cards.cardName)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const packIsEmpty: boolean =
    totalCardsCount === 0 && !queryParams.cardAnswer && !queryParams.cardQuestion

  const notFound: boolean =
    totalCardsCount === 0 && (!!queryParams.cardAnswer || !!queryParams.cardQuestion)

  const clearCardStateHandler = () => {
    dispatch(clearCardsState())
  }

  const clearCardFilterHandler = () => {
    dispatch(
      setQueryParamsCards({ ...queryParams, cardAnswer: undefined, cardQuestion: undefined })
    )
  }

  const addNewCardHandler = () => dispatch(changeCardModalStatus('modalCreate', true))

  const learnPackHandler = () => {
    dispatch(loadCards({ cardsPack_id: queryParams.cardsPack_id, pageCount: totalCardsCount }))
    navigate(PATH.LEARN)
  }

  useEffect(() => {
    if (queryParams) dispatch(loadCards(queryParams))
    // toast(JSON.stringify(queryParams)) // dev help
  }, [queryParams])
  // useEffect(() => {
  //   if (!isAuth) navigate(PATH.LOGIN)
  // }, [isAuth])

  return (
    <div className={s.container}>
      <BackLink callback={clearCardStateHandler} />

      <TitleBlock
        title={titlePack}
        isMyPack={isMyPack}
        packId={packId}
        buttonVisability={totalCardsCount === 0 ? 'hidden' : 'visible'}
        buttonName={isMyPack ? 'Add new card' : 'learn pack'}
        buttonCallback={isMyPack ? addNewCardHandler : learnPackHandler}
      />

      <SearchBlock />

      {totalCardsCount !== 0 && <CardTableContainer />}

      {!isLoading && packIsEmpty && (
        <PackIsEmpty callback={addNewCardHandler} isMyPack={isMyPack} />
      )}

      {!isLoading && notFound && (
        <NotFoundResult
          isLoading={isLoading}
          buttonName={'clear filter'}
          buttonCallback={clearCardFilterHandler}
        />
      )}

      <CardsPaginator />

      {/*//модалки*/}
      <DeletePack />
      <DeleteCard cardName={cardName} />
      <CreateCard key={queryParams.cardsPack_id} idPack={queryParams.cardsPack_id} />
      <UpdateCard />
      <UpdatePack />
    </div>
  )
}
