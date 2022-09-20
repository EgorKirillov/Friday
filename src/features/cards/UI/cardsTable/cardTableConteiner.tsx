import React from 'react'

import Rating from '@mui/material/Rating/Rating'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'

import deleteIcon from '../../../../assets/svg/Delete.svg'
import editIcon from '../../../../assets/svg/Edit.svg'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import {
  changeCardModalStatus,
  setQuestionCard,
  setIdCard,
  setQueryParamsCards,
  setCardData,
} from '../../cardReducer'
import { ColumnSortCardsName, SortCardsType } from '../../cardsAPI'

import { CardTable } from './cardTable'

export const CardTableContainer = () => {
  const data = useAppSelector(state => state.cards.cards)
  const idUser = useAppSelector(state => state.profile._id)
  const cardQueryParam = useAppSelector(state => state.cards.queryParams)

  const dispatch = useAppDispatch()

  const columnName = [
    { key: 'question' as ColumnSortCardsName, label: 'Question', isSortable: false },
    { key: 'answer' as ColumnSortCardsName, label: 'Answer', isSortable: false },
    { key: 'updated' as ColumnSortCardsName, label: 'Last Update', isSortable: true },
    { key: 'grade' as ColumnSortCardsName, label: 'Grade', isSortable: true },
    { key: 'actions' as ColumnSortCardsName, label: '', isSortable: false },
  ]
  const sort = (val: string) => {
    const name = val as ColumnSortCardsName
    // if queryParams sort '^'(up) --> make sort 'v'(down)
    // else all another case  --> make sort '^'(up)

    const value: SortCardsType =
      !!cardQueryParam && cardQueryParam.sortCards === `1${name}` ? `0${name}` : `1${name}`

    dispatch(setQueryParamsCards({ ...cardQueryParam, sortCards: value }))
  }

  const onClickDelete = (idCard: string, questionCard: string) => {
    dispatch(setIdCard(idCard))
    dispatch(setQuestionCard(questionCard))
    dispatch(changeCardModalStatus('modalDelete', true))
  }

  const rows =
    data &&
    data.map(el => {
      const onClickEdit = () => {
        dispatch(changeCardModalStatus('modalEdit', true))
        dispatch(setCardData(el._id, el.question, el.answer))
      }

      const itMyPack: boolean = idUser === el.user_id
      const updateDate =
        new Date(el.updated).toLocaleDateString('ru-RU') +
        ' ' +
        new Date(el.updated).toLocaleTimeString()

      return (
        <TableRow key={el._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell
            component="th"
            scope="row"
            style={{
              minWidth: '30%',
              maxWidth: '350px',
              // border: '1px solid red',
              boxSizing: 'border-box',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {el.questionImg ? (
              <img src={el.questionImg} alt="questionImg" style={{ height: '150px' }} />
            ) : (
              el.question
            )}
          </TableCell>

          <TableCell
            align="left"
            style={{
              minWidth: '30%',
              maxWidth: '350px',
              // border: '1px solid red',
              boxSizing: 'border-box',
              // whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {el.answerImg ? (
              <img src={el.answerImg} alt="answerImg" style={{ height: '150px' }} />
            ) : (
              el.answer
            )}
          </TableCell>
          <TableCell
            align="left"
            style={{
              width: '20%',
              // border: '1px solid blue',
              boxSizing: 'border-box',
            }}
          >
            {updateDate}
          </TableCell>
          <TableCell
            align="left"
            style={{
              width: '20%',
              // border: '1px solid black',
              boxSizing: 'border-box',
            }}
          >
            <Rating name="half-rating-read" value={el.grade} precision={0.25} readOnly />
            {/*<Rating name="read-only" value={el.grade} precision={0.25} readOnly />*/}
          </TableCell>
          <TableCell
            align="left"
            style={{
              width: '10%',
              // border: '1px solid red',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <div style={{ display: 'flex' }}>
              {itMyPack && (
                <>
                  <img
                    src={deleteIcon}
                    alt=""
                    style={{ margin: '0 5px', width: 'auto' }}
                    onClick={() => onClickDelete(el._id, el.question)}
                  />
                </>
              )}
              {itMyPack && (
                <>
                  <img src={editIcon} width={'auto'} alt="" onClick={onClickEdit} />
                </>
              )}
            </div>
          </TableCell>
        </TableRow>
      )
    })

  return (
    <div>
      <CardTable columnsName={columnName} sortCallback={sort}>
        {rows}
      </CardTable>
    </div>
  )
}
