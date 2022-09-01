import * as React from 'react'
import { useEffect } from 'react'

import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { toast } from 'react-toastify'

import deleteIcon from '../../../../assets/svg/Delete.svg'
import editIcon from '../../../../assets/svg/Edit.svg'
import teacherIcon from '../../../../assets/svg/teacher.svg'
import { useAppSelector } from '../../../../common/hooks/hooks'

import { PackTable } from './packTable'

export const PackTableContainer = () => {
  const data = useAppSelector(state => state.pack.cardPacks)
  const idUser = useAppSelector(state => state.profile._id)
  const packQueryParam = useAppSelector(state => state.pack.queryParams)

  const columnName = [
    { key: 'name', label: 'Name', isSortable: true },
    { key: 'cardsCount', label: 'Cards', isSortable: true },
    { key: 'updated', label: 'Last Update', isSortable: true },
    { key: 'user_name', label: 'Created by', isSortable: true },
    { key: 'actions', label: 'Actions ', isSortable: false },
  ]

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

    return (
      <TableRow key={el._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell component="th" scope="row">
          {el.name}
        </TableCell>
        <TableCell align="right">{el.cardsCount}</TableCell>
        <TableCell align="right">{el.updated}</TableCell>
        <TableCell align="right">{el.user_name}</TableCell>
        <TableCell align="center">
          <img src={teacherIcon} width={'auto'} alt="" onClick={onClickTeacher} />
          {idUser === el._id && (
            <img src={deleteIcon} width={'auto'} alt="" onClick={onClickDelete} />
          )}
          {idUser === el._id && <img src={editIcon} width={'auto'} alt="" onClick={onClickEdit} />}
        </TableCell>
      </TableRow>
    )
  })

  useEffect(() => {}, [packQueryParam])

  return (
    <div>
      <PackTable columnsName={columnName}>{rows}</PackTable>
    </div>
  )
}
