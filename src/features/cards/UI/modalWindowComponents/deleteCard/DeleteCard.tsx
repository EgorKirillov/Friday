import React from 'react'

import { CancelButton } from '../../../../../common/components/modalWindow/modalWindowButtons/cancelButton/CancelButton'
import { DeleteButton } from '../../../../../common/components/modalWindow/modalWindowButtons/deleteButton/DeleteButton'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'

export const DeleteCard = () => {
  return (
    <div>
      <div className={style.content}>
        <p>
          Do you really want to remove <b>Card Name</b>?
        </p>
        <p>All cards will be deleted.</p>
      </div>
      <div className={style.buttonsBlock}>
        <CancelButton />
        <DeleteButton />
      </div>
    </div>
  )
}
