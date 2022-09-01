import React from 'react'

import { ButtonWithLoader } from '../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { useAppSelector } from '../../../../common/hooks/hooks'

import s from './TitleBlock.module.css'

type PropsType = {
  title: string
  buttonName?: string
  buttonCallback?: () => void
  buttonVisability?: 'hidden' | 'visible'
  callbackTitle?: () => void
}

export const TitleBlock = ({
  title,
  buttonName,
  buttonCallback,
  buttonVisability = 'visible',
  callbackTitle,
}: PropsType) => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading = loading === 'loading'

  return (
    <div>
      <div className={s.title}>
        <div>
          <h2 onClick={callbackTitle}>{title}</h2>
        </div>

        <ButtonWithLoader
          name={buttonName}
          onClick={buttonCallback}
          isLoading={isLoading}
          visibility={buttonVisability}
        />
      </div>
    </div>
  )
}
