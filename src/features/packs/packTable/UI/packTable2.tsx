import * as React from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import style from './packTable.module.css'

export const rowsPackTable = (
  name: string,
  cardsCount: number,
  updated: string,
  CreatedBy: string,
  Actions: any
) => {
  return {
    name: name,
    cards: cardsCount,
    updated: updated,
    CreatedBy: CreatedBy,
    Actions: Actions,
  }
}

const rows = [
  rowsPackTable('Pack name', 10, '18.03.2020', 'Ivan Ivanov', 'some actions'),
  rowsPackTable('Pack name2', 10, '18.03.2020', 'Ivan Ivanov', 'some actions'),
  rowsPackTable('Pack name3', 10, '18.03.2020', 'Ivan Ivanov', 'some actions'),
  rowsPackTable('Pack name4', 10, '18.03.2020', 'Ivan Ivanov', 'some actions'),
  rowsPackTable('Pack name5', 10, '18.03.2020', 'Ivan Ivanov', 'some actions'),
  rowsPackTable('Pack name6', 10, '18.03.2020', 'Ivan Ivanov', 'some actions'),
  rowsPackTable('Pack name7', 10, '18.03.2020', 'Ivan Ivanov', 'some actions'),
]

export const PackTable = () => {
  return (
    <div className={style.pactTableWrapper}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow className={style.tableRow}>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cards</TableCell>
              <TableCell align="right">Last Update</TableCell>
              <TableCell align="right">Created by</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.cards}</TableCell>
                <TableCell align="right">{row.updated}</TableCell>
                <TableCell align="right">{row.CreatedBy}</TableCell>
                <TableCell align="center">{row.Actions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
