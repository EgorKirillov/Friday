import * as React from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import deleteIcon from '../../../../assets/svg/Delete.svg'
import editIcon from '../../../../assets/svg/Edit.svg'
import teacherIcon from '../../../../assets/svg/teacher.svg'
import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { setQueryParamsCards } from '../../../cards/cardReducer'
import { ColumnSortPacksName, SortPacksType } from '../../packAPI'
import { setQueryParams } from '../../packReducer'

import { PackTable } from './packTable'

export const PackTableContainer = () => {
  const data = useAppSelector(state => state.pack.cardPacks)
  const idUser = useAppSelector(state => state.profile._id)
  const packQueryParam = useAppSelector(state => state.pack.queryParams)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const columnName = [
    { key: 'name' as ColumnSortPacksName, label: 'Name', isSortable: true },
    { key: 'cardsCount' as ColumnSortPacksName, label: 'Cards', isSortable: true },
    { key: 'updated' as ColumnSortPacksName, label: 'Last Update', isSortable: true },
    { key: 'user_name' as ColumnSortPacksName, label: 'Created by', isSortable: true },
    { key: 'actions' as ColumnSortPacksName, label: 'Actions ', isSortable: false },
  ]
  const sort = (val: string) => {
    const name = val as ColumnSortPacksName

    // if queryParams sort '^'(up) --> make sort 'v'(down)
    // else all another case  --> make sort '^'(up)
    const value: SortPacksType =
      !!packQueryParam && packQueryParam.sortPacks === `1${name}` ? `0${name}` : `1${name}`

    dispatch(setQueryParams({ sortPacks: value }))
  }

  const rows = data.map(el => {
    const onClickDelete = () => {
      toast.info(`delete ${el._id}`)
    }
    const onClickEdit = () => {
      toast.info(`edit ${el._id}`)
    }
    const onClickTeacher = () => {
      toast.info(`teach ${el._id}`)
    }

    const onClickPack = (packId: string) => {
      dispatch(setQueryParamsCards({ cardsPack_id: packId }))
      navigate(PATH.CARDS)
    }
    const itMyPack: boolean = idUser === el.user_id

    return (
      <TableRow
        key={el._id}
        onClick={() => onClickPack(el._id)}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell
          component="th"
          scope="row"
          style={{
            width: '350px',
            border: '1px solid red',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {el.name}
        </TableCell>
        <TableCell align="left" style={{ width: '50px', border: '1px solid green' }}>
          {el.cardsCount}
        </TableCell>
        <TableCell align="left" style={{ width: '300px', border: '1px solid blue' }}>
          {el.updated}
        </TableCell>
        <TableCell align="left" style={{ width: '200px', border: '1px solid black' }}>
          {el.user_name}
        </TableCell>
        <TableCell align="left">
          <img
            src={teacherIcon}
            alt=""
            onClick={onClickTeacher}
            style={{ margin: '0 5px', width: 'auto' }}
          />
          {itMyPack && (
            <img
              src={deleteIcon}
              alt=""
              onClick={onClickDelete}
              style={{ margin: '0 5px', width: 'auto' }}
            />
          )}
          {itMyPack && (
            <img
              src={editIcon}
              alt=""
              onClick={onClickEdit}
              style={{ margin: '0 5px', width: 'auto' }}
            />
          )}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <div>
      <PackTable columnsName={columnName} sortCallback={sort}>
        {rows}
      </PackTable>
    </div>
  )
}
