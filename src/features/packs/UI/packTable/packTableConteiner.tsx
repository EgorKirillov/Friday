import React from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import deleteIcon from '../../../../assets/svg/Delete.svg'
import editIcon from '../../../../assets/svg/Edit.svg'
import teacherIcon from '../../../../assets/svg/teacher.svg'
import { PATH } from '../../../../common/components/routing/SwitchRoutes'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { loadCards, setQueryParamsCards } from '../../../cards/cardReducer'
import { ColumnSortPacksName, SortPacksType } from '../../packAPI'
import { changePackModalStatus, setIdPack, setNamePack, setQueryParams } from '../../packReducer'

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
    const onClickOpenModalWindowDeletePackHandler = (el: { _id: string; name: string }) => {
      dispatch(changePackModalStatus('modalDelete', true))
      dispatch(setIdPack(el._id))
      dispatch(setNamePack(el.name))
    }
    const onClickEdit = () => {
      toast.info(`edit ${el._id}`)
    }
    const onClickTeacher = () => {
      toast.info(`teach ${el._id} count ${el.cardsCount}`)
      dispatch(loadCards({ cardsPack_id: el._id, pageCount: el.cardsCount }))
      navigate(PATH.LEARN)
    }

    const onClickPack = (packId: string) => {
      dispatch(setQueryParamsCards({ cardsPack_id: packId }))
      navigate(PATH.CARDS)
    }
    const itMyPack: boolean = idUser === el.user_id
    const updateDate =
      new Date(el.updated).toLocaleDateString('ru-RU') +
      ' ' +
      new Date(el.updated).toLocaleTimeString()

    return (
      <TableRow key={el._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell
          component="td"
          scope="row"
          onClick={() => onClickPack(el._id)}
          style={{
            // width: '100%',
            minWidth: '30%',
            // maxWidth: '30%',
            maxWidth: '350px',
            // minWidth: '350px',
            // width: '350px',
            border: '1px solid red',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            boxSizing: 'border-box',
          }}
        >
          {el.name}
        </TableCell>
        <TableCell
          align="left"
          style={{ width: '10%', border: '1px solid green', boxSizing: 'border-box' }}
        >
          {el.cardsCount}
        </TableCell>
        <TableCell
          align="left"
          style={{ width: '30%', border: '1px solid blue', boxSizing: 'border-box' }}
        >
          {updateDate}
        </TableCell>
        <TableCell
          align="left"
          style={{
            width: '350px',
            maxWidth: '350px',
            border: '1px solid black',
            boxSizing: 'border-box',
          }}
        >
          {el.user_name}
        </TableCell>
        <TableCell
          align="left"
          style={{
            width: '10%',
            border: '1px solid red',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          <div style={{ display: 'flex' }}>
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
                onClick={() => onClickOpenModalWindowDeletePackHandler(el)}
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
          </div>
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
