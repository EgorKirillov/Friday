import React from 'react'

import { NavLink } from 'react-router-dom'

type PropsType = {
  link: string
  linkName: string
}

export const BackLink = ({ link, linkName }: PropsType) => {
  return (
    <div>
      <NavLink to={link}>{linkName}</NavLink>
    </div>
  )
}
