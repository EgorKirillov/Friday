import React, { ChangeEvent, useEffect, useState } from 'react'

import { Stack } from '@mui/material'
import Pagination from '@mui/material/Pagination'

import style from './Paginator.module.css'
import { SelectAutoWidth } from './select/Select'

type PropsType = {
  currentPage: number
  pagesCount: number
  countPerPage: number
  callbackCurrent: (currentPage: number) => void
  callbackCurrentPerPage: (countPerPage: number) => void
}

export const Paginator = (props: PropsType) => {
  const [page, setPage] = useState(props.currentPage)

  const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage)
    props.callbackCurrent(newPage)
  }

  const changeCardPerPage = (value: string) => {
    let number = +value

    props.callbackCurrentPerPage(number)
  }

  useEffect(() => {
    setPage(props.currentPage)
  }, [props.currentPage])

  return (
    <div className={style.paginatorContainer}>
      <Stack spacing={1}>
        <Pagination
          count={props.pagesCount}
          page={page}
          shape="rounded"
          onChange={handleChangePage}
        />{' '}
      </Stack>
      <div className={style.selectBlock}>
        <span className={style.span}>Show</span>
        <SelectAutoWidth callBack={changeCardPerPage} />
        <span className={style.span}>Cards per Page</span>
      </div>
    </div>
  )
}
