import React from 'react'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { CancelButton } from '../../../../../common/components/modalWindow/modalWindowButtons/cancelButton/CancelButton'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'

type PropsType = {
  onClose: () => void
  callBack?: () => void
}

export const ContentDeleteCard = (props: PropsType) => {
  return (
    <div>
      <div className={style.content}>
        <p>
          Do you really want to remove <b>Card Name</b>?
        </p>
        <p>All cards will be deleted.</p>
      </div>
      <div className={style.buttonsBlock}>
        <CancelButton callBack={props.onClose} />
        {/*<DeleteButton />*/}
        <ButtonWithLoader name={'Delete'} />
      </div>
    </div>
  )
}
