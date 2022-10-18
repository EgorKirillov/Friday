import React from 'react'

import { ButtonWithLoader } from '../../../../../common/components/buttonWithLoader/ButtonWithLoader'
import style from '../../../../../common/components/modalWindow/style/StylePacks.module.css'
import { useAppSelector } from '../../../../../common/hooks/hooks'

type PropsType = {
  onClose: () => void
  callBack?: () => void
  name?: string
  imgCard?: string
}

export const ContentDeleteCard = (props: PropsType) => {
  const isLoading = useAppSelector(state => state.app.status === 'loading')

  return (
    <div>
      <div className={style.content}>
        {props.imgCard ? (
          <p>
            Do you really want to remove ? <img src={props.imgCard} alt="questionImg" />
          </p>
        ) : (
          <p>
            Do you really want to remove <b>{props.name}</b> ?{' '}
          </p>
        )}

        <p>All cards will be deleted.</p>
      </div>
      <div className={style.buttonsBlock}>
        <ButtonWithLoader
          name={'Cancel'}
          styleButton={'cancel'}
          onClick={props.onClose}
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
