import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import { ButtonWithLoader } from '../../../common/components/buttonWithLoader/ButtonWithLoader'
import { Paginator } from '../../../common/components/paginator/Paginator'
import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { TitleBlock } from '../../packs/UI/TitleBlock'
import { createCard, deleteCard, loadCards, setQueryParamsCards } from '../cardReducer'
import { NewCardType } from '../cardsAPI'

import { BackLink } from './BackLink'
import s from './cardPage.module.css'
import { SearchBlock } from './SearchBlock'

export const CardsPage = () => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading: boolean = loading === 'loading'

  const queryParams = useAppSelector(state => state.cards.queryParams)
  const data = useAppSelector(state => state.cards.cards)

  const userId = useAppSelector(state => state.profile._id)
  const packUserId = useAppSelector(state => state.cards.packUserId)
  const isMyPack: boolean = userId === packUserId

  const dispatch = useAppDispatch()

  const page = useAppSelector(state => state.cards.page)
  const packsPerPage = useAppSelector(state => state.cards.pageCount)
  const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)

  const totalCardsPagesCount = Math.ceil(totalCardsCount / packsPerPage)

  const deleteCardHandler = (id: string) => {
    dispatch(deleteCard(id, { ...queryParams, page: 1 }))
    toast.warn(`карта удалена ${id}`)
  }
  const notEmptyPack: boolean =
    totalCardsCount === 0 && !!queryParams.cardAnswer && !!queryParams.cardQuestion
  const notFound: boolean =
    !!queryParams &&
    (!!queryParams.cardAnswer || !!queryParams.cardQuestion) &&
    totalCardsCount === 0
  const changeCurrentPage = (newPage: number) => {
    dispatch(setQueryParamsCards({ ...queryParams, page: newPage }))
  }
  const changePackPerPage = (newPackPerPage: number) => {
    dispatch(setQueryParamsCards({ ...queryParams, pageCount: newPackPerPage }))
  }

  const addNewCardHandler = () => {
    const newCard: NewCardType = {
      cardsPack_id: queryParams.cardsPack_id,
      question: 'qqq',
      answer: 'aaa',
    }

    dispatch(createCard(newCard, queryParams))
  }

  const learnPackHandler = () => {
    toast.info('learn this card')
  }

  const renderData = data
    ? data.map(card => {
        return (
          <div key={card._id} onClick={() => deleteCardHandler(card._id)}>
            {`${card._id} ${card.question} ${card.answer} ${card.updated} ${card.grade}`}
          </div>
        )
      })
    : null

  useEffect(() => {
    if (queryParams) dispatch(loadCards(queryParams))
    else toast.warn(' useEffect нет queryParams')
    toast(JSON.stringify(queryParams))
  }, [queryParams])

  return (
    <div className={s.container}>
      <BackLink link={PATH.PACKS} linkName={'<- Back to pack list'} />
      {isMyPack ? 'моя пачка' : 'НЕ моя пачка'}

      <TitleBlock
        title={'Card list'}
        hideButton={totalCardsCount === 0}
        buttonName={isMyPack ? 'Add new card' : 'learn pack'}
        buttonCallback={isMyPack ? addNewCardHandler : learnPackHandler}
      />
      <SearchBlock />

      {!notEmptyPack && (
        <div>
          <div>This pack is empty. Click add new card to fill this pack</div>
          <ButtonWithLoader
            name={'add new card'}
            isLoading={isLoading}
            onClick={addNewCardHandler}
          />
        </div>
      )}

      {notFound && <div>Not found</div>}
      {renderData}
      {/*<PackTableContainer />*/}

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
