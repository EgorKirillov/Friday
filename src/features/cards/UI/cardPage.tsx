import React, { useEffect } from 'react'

import CircularProgress from '@mui/material/CircularProgress/CircularProgress'
import { toast } from 'react-toastify'

import { Paginator } from '../../../common/components/paginator/Paginator'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { TitleBlock } from '../../packs/UI/TitleBlock'
import {
  clearCardsState,
  createCard,
  deleteCard,
  loadCards,
  setQueryParamsCards,
} from '../cardReducer'
import { NewCardType } from '../cardsAPI'

import { BackLink } from './backLink/BackLink'
import s from './cardPage.module.css'
import { NotFoundCards } from './notFoundCards/notFoundCards'
import { PackIsEmpty } from './packIsEmpty/packIsEmpty'
import { SearchBlock } from './searchBlock/SearchBlock'

export const CardsPage = () => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading: boolean = loading === 'loading'

  const queryParams = useAppSelector(state => state.cards.queryParams)
  const data = useAppSelector(state => state.cards.cards)
  const titlePack = useAppSelector(state => state.cards.packName)

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

    return () => {
      dispatch(clearCardsState())
    }
  }, [queryParams])

  return (
    <div className={s.container}>
      <BackLink />

      {/*<div>{isMyPack ? 'моя пачка кнопка ADD' : 'НЕ моя пачка кнопка LEARN'}</div>
      <div>
        {totalCardsCount === 0 ? 'нет данных для отображения кнопку убрать' : 'есть что отображать'}
      </div>
      <div>
        {!!queryParams.cardAnswer || !!queryParams.cardQuestion ? 'идет поиск' : 'поиск не идет'}
      </div>

      {totalCardsCount === 0 && !queryParams.cardAnswer && !queryParams.cardQuestion && (
        <div>задизэбл поиска , показать кнопку добавить карту</div>
      )}

      {totalCardsCount === 0 && (!!queryParams.cardAnswer || !!queryParams.cardQuestion) && (
        <div>поиск активен, NOT FOUND, кнопку очистить фильтh</div>
      )}*/}

      <TitleBlock
        title={titlePack}
        buttonVisability={totalCardsCount === 0 ? 'hidden' : 'visible'}
        buttonName={isMyPack ? 'Add new card' : 'learn pack'}
        buttonCallback={isMyPack ? addNewCardHandler : learnPackHandler}
      />

      <SearchBlock />

      {packIsEmpty && <PackIsEmpty callback={addNewCardHandler} isMyPack={isMyPack} />}

      {notFound && <NotFoundCards />}
      {isLoading ? (
        <CircularProgress style={{ margin: '0 auto', paddingTop: '30px' }} />
      ) : (
        renderData
      )}

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
