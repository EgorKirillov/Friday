import React, { useEffect, useState } from 'react'

import { Box, Slider } from '@mui/material'

import { useAppDispatch, useAppSelector } from '../../../../../common/hooks/hooks'
import { setQueryParams } from '../../../packReducer'

import style from './DoubleSlider.module.css'

export const DoubleSlider = () => {
  const dispatch = useAppDispatch()
  const minValue = useAppSelector(state => state.pack.minCardsCount)
  const maxValue = useAppSelector(state => state.pack.maxCardsCount)
  const [value, setValue] = useState<number[]>([0, maxValue])
  const [timerId, setTimerId] = useState(0)

  const handleChange = (event: Event, newValue: number | number[]) => {
    const val = newValue as number[]

    setValue(val)
    clearTimeout(timerId)
    const id = +setTimeout(() => {
      dispatch(setQueryParams({ min: val[0], max: val[1] }))
    }, 1000)

    setTimerId(id)
  }

  // useEffect(() => {
  //   if (value[0] < minValue || value[1] > maxValue) {
  //     setValue([minValue, maxValue])
  //   }
  // }, [minValue, maxValue])

  useEffect(() => {
    setValue([minValue, maxValue])
  }, [minValue, maxValue])

  return (
    <div className={style.sliderContainer}>
      <div className={style.label}>Number of cards</div>
      <div className={style.sliderBox}>
        <div className={style.value}>{value[0]}</div>
        <Box sx={{ width: 155 }} className={style.slider}>
          <Slider
            getAriaLabel={() => 'Cards count range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={() => ''}
            min={minValue}
            max={maxValue}
          />
        </Box>
        <div className={style.value}>{value[1]}</div>
      </div>
    </div>
  )
}
