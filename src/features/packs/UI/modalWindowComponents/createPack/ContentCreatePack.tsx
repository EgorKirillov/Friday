import React, { ChangeEvent, useState } from 'react'

import { Checkbox } from '@mui/material'
import Box from '@mui/material/Box/Box'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField/TextField'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'
import { InputTypeFile } from '../../../../../common/utils/inputTypeFile'

type PropsType = {
  onClose: () => void
  callBack: (namePack: string, privatePack: boolean, cover: string) => void
}
export const ContentCreatePack = (props: PropsType) => {
  const [namePack, setNamePack] = useState('')
  const [privatePack, setPrivatePack] = useState(false)
  const [cover, setCover] = useState('')

  const handleChangeNamePack = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNamePack(event.target.value)
  }

  const handleChangePrivatePack = (event: ChangeEvent<HTMLInputElement>) => {
    setPrivatePack(event.currentTarget.checked)
  }
  const setCoverBase64 = (cover: string) => {
    setCover(cover)
  }
  const onClickHandlerSave = () => {
    props.callBack(namePack, privatePack, cover)
  }

  return (
    <div>
      <div className={style.content}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          noValidate
          autoComplete="off"
        >
          <FormControl variant="standard" style={{ width: '98%' }}>
            <TextField
              label={'Name Pack'}
              variant="standard"
              focused
              value={namePack}
              onChange={handleChangeNamePack}
            />
            <div>
              <InputTypeFile callback={setCoverBase64} /> Download cover
            </div>
            <div>
              <Checkbox value={privatePack} onChange={handleChangePrivatePack} />
              Private pack
            </div>
          </FormControl>
        </Box>
        <div className={style.buttonsBlock}>
          <ButtonWithLoader name={'Cancel'} styleButton={'cancel'} onClick={props.onClose} />
          <ButtonWithLoader name={'Save'} styleButton={'save'} onClick={onClickHandlerSave} />
        </div>
      </div>
    </div>
  )
}
