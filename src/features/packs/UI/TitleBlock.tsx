import React from 'react'

import { NavLink } from 'react-router-dom'

import { ButtonWithLoader } from '../../../common/components/buttonWithLoader/ButtonWithLoader'

import s from './TitleBlock.module.css'

type PropsType = {
  title: string
  buttonName: string
  buttonCallback: () => void
  link?: string
  linkName?: string
}

export const TitleBlock = ({ title, buttonName, buttonCallback, link, linkName }: PropsType) => {
  return (
    <div>
      {link && linkName && <NavLink to={link}>{linkName}</NavLink>}

      <div className={s.title}>
        <h2>{title}</h2>
        <ButtonWithLoader name={buttonName} onClick={buttonCallback} isLoading={false} />
      </div>
    </div>
  )
}
