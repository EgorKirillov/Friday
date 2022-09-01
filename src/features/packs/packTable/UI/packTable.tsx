import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { toast } from 'react-toastify'

import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { ColumnSortPacksName, SortPacksType } from '../../packAPI'
import { setQueryParams } from '../../packReducer'

import style from './packTable.module.css'

type PropsTableType = {
  children: React.ReactNode
  columnsName: ColumnsNameType[]
  // data: React.ReactNode[]
}
type ColumnsNameType = {
  key: ColumnSortPacksName
  label: string
  isSortable: boolean
}

export const PackTable = (props: PropsTableType) => {
  const dispatch = useAppDispatch()
  const packQueryParam = useAppSelector(state => state.pack.queryParams)
  const columns = props.columnsName.map((columnName, index) => {
    const onClickColumnsHandler = () => {
      if (packQueryParam) {
        console.log(packQueryParam.sortPacks)
        const value: SortPacksType =
          packQueryParam.sortPacks === `1${columnName.key}`
            ? `0${columnName.key}`
            : `1${columnName.key}`

        dispatch(setQueryParams({ sortPacks: value }))
      }

      toast.info(index)
    }
    let name = columnName.label

    if (
      columnName.isSortable &&
      !!packQueryParam &&
      packQueryParam.sortPacks === `0${columnName.key}`
    ) {
      name += '▼'
    } else if (
      columnName.isSortable &&
      !!packQueryParam &&
      packQueryParam.sortPacks === `1${columnName.key}`
    ) {
      name += '▲'
    }
    // columnName.label +
    // (
    //   columnName.isSortable &&
    //   !!packQueryParam &&
    //   packQueryParam.sortPacks === `1${columnName.key}` &&
    //   '▼'
    // )+(
    //   columnName.isSortable &&
    //     !!packQueryParam &&
    //     packQueryParam.sortPacks === `0${columnName.key}` &&
    //     '▲'
    // )

    return (
      <TableCell key={columnName.key} align={'right'} onClick={onClickColumnsHandler}>
        {name}
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
