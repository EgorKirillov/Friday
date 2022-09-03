import React, { useState } from 'react'

import { CancelButton } from '../../../../../common/components/modalWindow/modalWindowButtons/cancelButton/CancelButton'
import { SaveButton } from '../../../../../common/components/modalWindow/modalWindowButtons/saveButton/SaveButton'
import { ModalCheckBox } from '../../../../../common/components/modalWindow/modalWindowChackBox/modalWindowCheckBox'
import { ModalWindowInput } from '../../../../../common/components/modalWindow/modalWindowInput/ModalWindowInput'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'

export const ContentAddNewPack = () => {
  const [name, setName] = useState('')
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <ModalWindowInput name={name} setName={setName} />
      <div className={style.checkBox}>
        <ModalCheckBox checked={checked} setChecked={setChecked} />
      </div>
      <div className={style.buttonsBlock}>
        {/*<CancelButton />*/}
        <SaveButton />
      </div>
    </div>
  )
}
