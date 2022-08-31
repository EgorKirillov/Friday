import React, { useEffect } from 'react'

import { toast } from 'react-toastify'

import { Paginator } from '../../../common/components/paginator/Paginator'
import { PATH } from '../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../common/hooks/hooks'
import { TitleBlock } from '../../packs/UI/TitleBlock'
import { createCard, deleteCard, loadCards, setQueryParamsCards } from '../cardReducer'
import { NewCardType } from '../cardsAPI'

// import { FilterBlock } from './FilterBlock'
// import { TitleBlock } from './TitleBlock'

export const CardsPage = () => {
  const queryParams = useAppSelector(state => state.cards.queryParams)
  const data = useAppSelector(state => state.cards.cards)
  const dispatch = useAppDispatch()

  const page = useAppSelector(state => state.cards.page)
  const packsPerPage = useAppSelector(state => state.cards.pageCount)
  const totalPacksCount = useAppSelector(state => state.cards.cardsTotalCount)

  const totalCardsPagesCount = Math.ceil(totalPacksCount / packsPerPage)

  const deleteCardHandler = (id: string) => {
    dispatch(deleteCard(id, { ...queryParams, page: 1 }))
    toast.warn(`карта удалена ${id}`)
  }

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
        buttonName={'Add new card'}
        buttonCallback={addNewCardHandler}
        link={PATH.PACKS}
        linkName={'Back to pack list'}
      />
      {/*<FilterBlock />*/}
      {/*<button onClick={() => sort('name')}>sort 1 colunm</button>*/}
      {/*<button onClick={() => sort('cardsCount')}>sort 2 colunm</button>*/}
      {/*<button onClick={() => sort('updated')}>sort 3 colunm</button>*/}
      {/*<button onClick={() => sort('user_name')}>sort 4 colunm</button>*/}
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
