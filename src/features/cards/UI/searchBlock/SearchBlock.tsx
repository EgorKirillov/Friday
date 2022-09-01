import React from 'react'

import { Search } from '../../../../common/components/search/Search'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setQueryParamsCards } from '../../cardReducer'

import s from './SearchBlock.module.css'

export const SearchBlock = () => {
  const queryParams = useAppSelector(state => state.cards.queryParams)
  const answer = queryParams.cardAnswer
  const question = queryParams.cardQuestion
  const dispatch = useAppDispatch()
  const totalCountCards = useAppSelector(state => state.cards.cardsTotalCount)

  const noData = totalCountCards === 0 && !answer && !question

  const setSearchParamAnswer = (val: string) => {
    const cardAnswer = val.trim() === '' ? undefined : val

    dispatch(setQueryParamsCards({ ...queryParams, cardAnswer }))
  }

  const setSearchParamQuestion = (val: string) => {
    const cardQuestion = val.trim() === '' ? undefined : val

    dispatch(setQueryParamsCards({ ...queryParams, cardQuestion }))
  }

  return (
    <div className={s.searchBlock}>
      <Search
        callback={setSearchParamQuestion}
        startValue={question ? question : ''}
        titleSearch={'Search by question'}
        disabled={noData}
      />
      <Search
        callback={setSearchParamAnswer}
        startValue={answer ? answer : ''}
        titleSearch={'Search by answer'}
        disabled={noData}
      />
    </div>
  )
}