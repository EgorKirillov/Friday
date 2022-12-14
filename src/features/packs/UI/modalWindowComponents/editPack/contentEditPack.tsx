import React, { useState } from 'react'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { ModalCheckBox } from '../../../../../common/components/modalWindow/modalWindowChackBox/modalWindowCheckBox'
import { ModalWindowInput } from '../../../../../common/components/modalWindow/modalWindowInput/ModalWindowInput'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'
import { useAppSelector } from '../../../../../common/hooks/hooks'
import { InputTypeFile } from '../../../../../common/utils/inputTypeFile'

type PropsType = {
  oldCover: string
  name: string
  handleClose: () => void
  saveNewName: (name: string, checked: boolean, deckCover: string) => void
}
export const ContentEditPack = (props: PropsType) => {
  const status = useAppSelector(state => state.app.status)
  const [name, setName] = useState(props.name)
  const [checked, setChecked] = useState(false)
  const [cover, setCover] = useState(props.oldCover)

  const onChangeName = (newName: string) => {
    setName(newName)
  }
  const saveNewName = () => {
    props.saveNewName(name, checked, cover)
  }
  const handleClose = () => {
    props.handleClose()
  }
  const saveNewCover = (cover: string) => {
    setCover(cover)
  }

  return (
    <div>
      <p className={style.cover}>
        <img src={cover} alt="cover" height={'150px'} />
      </p>
      <ModalWindowInput name={name} setName={onChangeName} />
      <div>
        <InputTypeFile callback={saveNewCover} /> Download cover
      </div>
      <div className={style.checkBox}>
        <ModalCheckBox checked={checked} setChecked={setChecked} />
      </div>
      <div className={style.buttonsBlock}>
        <ButtonWithLoader
          name={'Cancel'}
          styleButton={'cancel'}
          onClick={handleClose}
          isLoading={status === 'loading'}
        />
        <ButtonWithLoader
          name={'Save'}
          styleButton={'save'}
          onClick={saveNewName}
          isLoading={status === 'loading'}
        />
      </div>
    </div>
  )
}
