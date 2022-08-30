import React, { useState } from 'react'

import { Stack } from '@mui/material'
import Pagination from '@mui/material/Pagination'

import style from './Paginator.module.css'
import { SelectAutoWidth } from './select/Select'

export const Paginator = () => {
  const [page, setPage] = useState(2)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <div className={style.paginatorContainer}>
      <Stack spacing={1}>
        <Pagination count={10} shape="rounded" />
      </Stack>
      <div className={style.selectBlock}>
        <span className={style.span}>Show</span>
        <SelectAutoWidth />
        <span className={style.span}>Cards per Page</span>
      </div>
    </div>
  )
}
