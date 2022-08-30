import React, { ChangeEvent, useEffect, useState } from 'react'

import InputAdornment from '@mui/material/InputAdornment/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput/OutlinedInput'

import MagnifyingGlass from '../../../assets/img/MagnifyingGlass.svg'

import style from './Search.module.css'
type PropsType = {
  callback: (val: string) => void
  startValue: string
}

export const Search = ({ callback, startValue }: PropsType) => {
  const [title, setTitle] = useState<string | undefined>(startValue)
  const [timerId, setTimerId] = useState(0)

  const onChangeText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value)
    const val = e.currentTarget.value

    clearTimeout(timerId)
    const id = +setTimeout(() => {
      callback(val)
    }, 1000)

    setTimerId(id)
  }

  useEffect(() => {
    setTitle(startValue)

    return clearTimeout(timerId)
  }, [startValue])

  return (
    <div className={style.searchContainer}>
      <div className={style.label}>Search</div>
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
