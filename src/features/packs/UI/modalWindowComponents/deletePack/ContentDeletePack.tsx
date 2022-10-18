import React from 'react'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'
import { useAppSelector } from '../../../../../common/hooks/hooks'

type PropsType = {
  close: () => void
  callBack?: () => void
  name?: string
  imgPack?: string
}

export const ContentDeletePack = (props: PropsType) => {
  const status = useAppSelector(state => state.app.status)
  const isLoading = status === 'loading'

  return (
    <div>
      <div className={style.content}>
        <p>
          Do you really want to remove <b>{props.name}</b>?
        </p>
        {props.imgPack ? (
          <div style={{ textAlign: 'center' }}>
            <img src={props.imgPack} alt="imgPack" style={{ height: '150px' }} />
          </div>
        ) : null}
        <p>All cards will be deleted.</p>
      </div>
      <div className={style.buttonsBlock}>
        <ButtonWithLoader
          name={'Cancel'}
          styleButton={'cancel'}
          onClick={props.close}
          isLoading={isLoading}
        />
        <ButtonWithLoader
          name={'Delete'}
          styleButton={'delete'}
          onClick={props.callBack}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
