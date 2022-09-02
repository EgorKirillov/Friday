import React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppSelector } from '../../../../common/hooks/hooks'

import style from './packTable.module.css'

type PropsTableType = {
  children: React.ReactNode
  columnsName: ColumnsNameType[]
  sortCallback: (val: string) => void
}
type ColumnsNameType = {
  key: string
  label: string
  isSortable: boolean
}

export const PackTable = (props: PropsTableType) => {
  const packQueryParam = useAppSelector(state => state.pack.queryParams)

  const columns = props.columnsName.map(columnName => {
    const onClickColumnsHandler = () => {
      if (packQueryParam && columnName.isSortable) props.sortCallback(columnName.key)
    }

    let name = columnName.label

    if (columnName.isSortable && !!packQueryParam) {
      if (packQueryParam.sortPacks === `0${columnName.key}`) name += '▼'
      else if (packQueryParam.sortPacks === `1${columnName.key}`) name += '▲'
    }

    return (
      <TableCell key={columnName.key} align={'left'} onClick={onClickColumnsHandler}>
        {name}
      </TableCell>
    )
  })

  return (
    <div className={style.pactTableWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow className={style.tableRow}>{columns}</TableRow>
          </TableHead>
          <TableBody>{props.children}</TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
