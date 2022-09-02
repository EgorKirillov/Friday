import React from 'react'

import Rating from '@mui/material/Rating/Rating'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { toast } from 'react-toastify'

import deleteIcon from '../../../../assets/svg/Delete.svg'
import editIcon from '../../../../assets/svg/Edit.svg'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setQueryParamsCards } from '../../cardReducer'
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
    { key: 'grade' as ColumnSortCardsName, label: 'Crade', isSortable: true },
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

  const rows =
    data &&
    data.map(el => {
      const onClickDelete = () => {
        toast.info(`delete ${el.cardsPack_id}`)
      }
      const onClickEdit = () => {
        toast.info(`edit ${el.cardsPack_id}`)
      }

      const itMyPack: boolean = idUser === el.user_id
      const updateDate = new Date(el.updated).toLocaleString('ru')

      return (
        <TableRow key={el._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell component="th" scope="row">
            {el.question}
          </TableCell>

          <TableCell align="right">{el.answer}</TableCell>
          <TableCell align="right">{updateDate}</TableCell>
          <TableCell align="right">
            <Rating name="read-only" value={el.grade} readOnly />
          </TableCell>
          <TableCell align="center">
            {itMyPack && <img src={deleteIcon} width={'auto'} alt="" onClick={onClickDelete} />}
            {itMyPack && <img src={editIcon} width={'auto'} alt="" onClick={onClickEdit} />}
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
