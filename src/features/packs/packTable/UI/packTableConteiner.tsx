import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { toast } from 'react-toastify'

import deleteIcon from '../../../../assets/svg/Delete.svg'
import editIcon from '../../../../assets/svg/Edit.svg'
import teacherIcon from '../../../../assets/svg/teacher.svg'
import { useAppSelector } from '../../../../common/hooks/hooks'

import style from './packTable.module.css'

type PropsTableType = {
  children: React.ReactNode
  columnsName: string[]
}

const PackTable = (props: PropsTableType) => {
  const columns = props.columnsName.map((columnName, index) => {
    const onClickColumnsHandler = () => {
      toast.info(index)
    }

    return (
      <TableCell key={index} align={'right'} onClick={onClickColumnsHandler}>
        {columnName}
      </TableCell>
    )
  })

  return (
    <div className={style.pactTableWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className={style.tableRow}>{columns}</TableRow>
          </TableHead>
          <TableBody>{props.children}</TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export const PackTableContainer = () => {
  const columnName = ['Name', 'Cards', 'Last Update', 'Created by', 'Actions']
  const data = useAppSelector(state => state.pack.cardPacks)
  const idUser = useAppSelector(state => state.profile._id)

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
          {el.name}{' '}
        </TableCell>
        <TableCell align="right">{el.cardsCount}</TableCell>
        <TableCell align="right">{el.updated}</TableCell>
        <TableCell align="right">{el.user_name}</TableCell>
        <TableCell align="center">
          <img src={teacherIcon} width={'auto'} alt="" onClick={onClickTeacher} />
          {idUser === el.user_id && (
            <img src={deleteIcon} width={'auto'} alt="" onClick={onClickDelete} />
          )}
          {idUser === el.user_id && (
            <img src={editIcon} width={'auto'} alt="" onClick={onClickEdit} />
          )}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <div>
      <PackTable columnsName={columnName}>{rows}</PackTable>
    </div>
  )
}
