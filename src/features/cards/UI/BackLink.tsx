import React from 'react'

import { NavLink } from 'react-router-dom'

type PropsType = {
  link: string
  linkName: string
  clickCallback?: () => void
}

export const BackLink = ({ link, linkName, clickCallback }: PropsType) => {
  return (
    <div>
      <NavLink to={link} onClick={clickCallback}>
        {linkName}
      </NavLink>
    </div>
  )
}
