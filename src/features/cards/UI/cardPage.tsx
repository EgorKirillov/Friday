import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import { ButtonWithLoader } from '../../../common/components/buttonWithLoader/ButtonWithLoader'
import { Paginator } from '../../../common/components/paginator/Paginator'
import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { Search } from '../../../common/components/search/Search'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { FilterBlock } from '../../packs/UI/FilterBlock'
import { TitleBlock } from '../../packs/UI/TitleBlock'
import { createCard, deleteCard, loadCards, setQueryParamsCards } from '../cardReducer'
import { NewCardType } from '../cardsAPI'

// import { FilterBlock } from './FilterBlock'
// import { TitleBlock } from './TitleBlock'

export const CardsPage = () => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading: boolean = loading === 'loading'
  const queryParams = useAppSelector(state => state.cards.queryParams)
  const data = useAppSelector(state => state.cards.cards)
  const dispatch = useAppDispatch()

  const userId = useAppSelector(state => state.profile._id)
  const packId = useAppSelector(state => state.cards.packUserId)
  const isMyPack: boolean = userId === packId
  const page = useAppSelector(state => state.cards.page)
  const packsPerPage = useAppSelector(state => state.cards.pageCount)
  const totalCardsCount = useAppSelector(state => state.cards.cardsTotalCount)

  const totalCardsPagesCount = Math.ceil(totalCardsCount / packsPerPage)
  const startSearchValAnswer = queryParams.cardAnswer
  const startSearchValQuestion = queryParams.cardQuestion
  const deleteCardHandler = (id: string) => {
    dispatch(deleteCard(id, { ...queryParams, page: 1 }))
    toast.warn(`карта удалена ${id}`)
  }
  const notEmptyPack: boolean =
    totalCardsCount === 0 && !!queryParams && !!queryParams.cardAnswer && !!queryParams.cardQuestion
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

  const setSearchNameAnswer = (val: string) => {
    dispatch(setQueryParamsCards({ ...queryParams, cardAnswer: val }))
  }

  const setSearchNameQuestion = (val: string) => {
    dispatch(setQueryParamsCards({ ...queryParams, cardQuestion: val }))
  }

  const learnPackHandler = () => {
    toast.info('learn this card')
  }

  const renderData = data ? (
    data.map(card => {
      return (
        <div key={card._id}>
          <div onClick={() => deleteCardHandler(card._id)}>
            <>
              {card._id} {card.question} {card.answer} {card.updated} {card.grade}
            </>
          </div>
        </div>
      )
    })
  ) : (
    <div>dd</div>
  )

  // const addNewCardHandler = () => {
  //   const index = new Date().getSeconds()
  //
  //   dispatch(
  //     createCard(
  //       { cardsPack_id:  question: `question ${index}`, answer: `answer ${index + 1}` },
  //       { ...queryParams, page: 1 }
  //     )
  //   )
  //   toast.info('создать пачку')
  // }

  useEffect(() => {
    if (queryParams) dispatch(loadCards(queryParams))
    else toast.warn('нет ID')
    toast(JSON.stringify(queryParams))
    console.log(queryParams.cardsPack_id)
  }, [queryParams])

  return (
    <div>
      <TitleBlock
        title={'Card list'}
        hideButton={totalCardsCount === 0}
        buttonName={isMyPack ? 'Add new card' : 'learn pack'}
        buttonCallback={isMyPack ? addNewCardHandler : learnPackHandler}
        link={PATH.PACKS}
        linkName={'Back to pack list'}
      />
      <Search
        callback={setSearchNameQuestion}
        startValue={startSearchValQuestion ? startSearchValQuestion : ''}
        titleSearch={'Search by qustions'}
      />
      <Search
        callback={setSearchNameAnswer}
        startValue={startSearchValAnswer ? startSearchValAnswer : ''}
        titleSearch={'Search by answer'}
      />

      {/*<button onClick={() => sort('name')}>sort 1 colunm</button>*/}
      {/*<button onClick={() => sort('cardsCount')}>sort 2 colunm</button>*/}
      {/*<button onClick={() => sort('updated')}>sort 3 colunm</button>*/}
      {/*<button onClick={() => sort('user_name')}>sort 4 colunm</button>*/}
      {notEmptyPack && (
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
