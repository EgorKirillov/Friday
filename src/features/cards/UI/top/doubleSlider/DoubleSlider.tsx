import React, { useState } from 'react'

import { Box, Slider } from '@mui/material'

import { useAppDispatch } from '../../../../../common/hooks/hooks'

import style from './DoubleSlider.module.css'

export const DoubleSlider = () => {
  const dispatch = useAppDispatch()
  const [value, setValue] = useState<number[]>([0, 100])
  const [timerId, setTimerId] = useState(0)

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[])
    clearTimeout(timerId)
    const id = +setTimeout(() => {
      // dispatch(....(value))
    }, 1000)

    setTimerId(id)
  }

  return (
    <div className={style.sliderContainer}>
      <div className={style.label}>Number of cards</div>
      <div className={style.sliderBox}>
        <div className={style.value}>{value[0]}</div>
        <Box sx={{ width: 155 }} className={style.slider}>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={() => ''}
          />
        </Box>
        <div className={style.value}>{value[1]}</div>
      </div>
    </div>
  )
}
