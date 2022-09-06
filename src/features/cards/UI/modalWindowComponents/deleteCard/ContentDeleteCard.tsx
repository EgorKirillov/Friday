import React from 'react'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'

type PropsType = {
  onClose: () => void
  callBack: () => void
  namePack: string | undefined
}

export const ContentDeleteCard = (props: PropsType) => {
  return (
    <div>
      <div className={style.content}>
        <p>
          Do you really want to remove <b>{props.namePack}</b>?
        </p>
        <p>All cards will be deleted.</p>
      </div>
      <div className={style.buttonsBlock}>
        <ButtonWithLoader name={'Cancel'} styleButton={'cancel'} onClick={props.onClose} />
        <ButtonWithLoader name={'Delete'} styleButton={'delete'} onClick={props.callBack} />
      </div>
    </div>
  )
}
