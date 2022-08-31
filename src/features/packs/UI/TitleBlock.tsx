import React from 'react'

import { NavLink } from 'react-router-dom'

import { ButtonWithLoader } from '../../../common/components/buttonWithLoader/ButtonWithLoader'
import { useAppSelector } from '../../../common/hooks/hooks'

import s from './TitleBlock.module.css'

type PropsType = {
  title: string
  buttonName?: string
  buttonCallback?: () => void
  hideButton?: boolean
  link?: string
  linkName?: string
}

export const TitleBlock = ({
  title,
  buttonName,
  buttonCallback,
  link,
  linkName,
  hideButton = false,
}: PropsType) => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading = loading === 'loading'

  return (
    <div>
      <div className={s.title}>
        <div>
          {link && linkName && <NavLink to={link}>{linkName}</NavLink>}
          <h2>{title}</h2>
        </div>
        {hideButton || (
          <ButtonWithLoader name={buttonName} onClick={buttonCallback} isLoading={isLoading} />
        )}
      </div>
    </div>
  )
}
