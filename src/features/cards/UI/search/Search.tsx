import React, { ChangeEvent, useState } from 'react'

import { InputAdornment, OutlinedInput } from '@mui/material'

import MagnifyingGlass from '../../../../assets/img/MagnifyingGlass.svg'
import { useAppDispatch } from '../../../../common/hooks/hooks'

import style from './Search.module.css'

export const Search = () => {
  const dispatch = useAppDispatch()

  const [title, setTitle] = useState('')
  const [timerId, setTimerId] = useState(0)

  const onChangeText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value)
    clearTimeout(timerId)
    const id = +setTimeout(() => {
      // dispatch(....(title))
    }, 1000)

    setTimerId(id)
  }

  return (
    <div className={style.searchContainer}>
      <div className={style.name}>Search</div>
      <OutlinedInput
        value={title}
        onChange={onChangeText}
        className={style.input}
        placeholder="Provide your text"
        startAdornment={
          <InputAdornment position="start">
            <img src={MagnifyingGlass} alt="magnifier icon" />
          </InputAdornment>
        }
      />
    </div>
  )
}
