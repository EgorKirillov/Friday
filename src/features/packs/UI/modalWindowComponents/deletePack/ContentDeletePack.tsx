import React from 'react'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'
import { useAppSelector } from '../../../../../common/hooks/hooks'

type PropsType = {
  close: () => void
  callBack?: () => void
  name: string
}

export const ContentDeletePack = (props: PropsType) => {
  const status = useAppSelector(state => state.app.status)

  return (
    <div>
      <div className={style.content}>
        <p>
          Do you really want to remove <b>{props.name}</b>?
        </p>
        <p>All cards will be deleted.</p>
      </div>
      <div className={style.buttonsBlock}>
        <ButtonWithLoader
          name={'Cancel'}
          styleButton={'cancel'}
          onClick={props.close}
          isLoading={status === 'loading'}
        />
        <ButtonWithLoader
          name={'Delete'}
          styleButton={'delete'}
          onClick={props.callBack}
          isLoading={status === 'loading'}
        />
      </div>
    </div>
  )
}
