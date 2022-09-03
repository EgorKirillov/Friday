import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import { Paginator } from '../../../common/components/paginator/Paginator'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { TitleBlock } from '../../packs/UI/titleBlock/TitleBlock'
import { createCard, deleteCard, loadCards, setQueryParamsCards } from '../cardReducer'
import { NewCardType } from '../cardsAPI'

import { BackLink } from './backLink/BackLink'
import s from './cardPage.module.css'
import { CardTableContainer } from './cardsTable/cardTableConteiner'
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

  const page = useAppSelector(state => state.cards.page)
  const packsPerPage = useAppSelector(state => state.cards.pageCount)
  const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)
  const totalCardsPagesCount = Math.ceil(totalCardsCount / packsPerPage)

  const dispatch = useAppDispatch()

  const deleteCardHandler = (id: string) => {
    dispatch(deleteCard(id))
    toast.warn(`карта удалена ${id}`)
  }

  const packIsEmpty: boolean =
    totalCardsCount === 0 && !queryParams.cardAnswer && !queryParams.cardQuestion

  const notFound: boolean =
    totalCardsCount === 0 && (!!queryParams.cardAnswer || !!queryParams.cardQuestion)

  const changeCurrentPage = (newPage: number) => {
    dispatch(setQueryParamsCards({ ...queryParams, page: newPage }))
  }

  const changePackPerPage = (newPackPerPage: number) => {
    dispatch(setQueryParamsCards({ ...queryParams, pageCount: newPackPerPage }))
  }

  const addNewCardHandler = () => {
    const newCard: NewCardType = {
      cardsPack_id: queryParams.cardsPack_id,
      question: 'q123qq',
      answer: 'aa1a',
    }

    dispatch(createCard(newCard))
  }

  const learnPackHandler = () => {
    toast.info('learn this card')
  }

  useEffect(() => {
    if (queryParams) dispatch(loadCards(queryParams))
    // toast(JSON.stringify(queryParams))     // dev help
  }, [queryParams])
  // useEffect(() => {
  //   if (!isAuth) navigate(PATH.LOGIN)
  // }, [isAuth])

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

      <Paginator
        pagesCount={totalCardsPagesCount}
        countPerPage={packsPerPage}
        currentPage={page}
        callbackCurrent={changeCurrentPage}
        callbackCurrentPerPage={changePackPerPage}
      />
    </div>
  )
}
