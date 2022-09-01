import React from 'react'

type PropsType = {
  icon: string
  name: string
  callBack: () => void
}

export const ButtonBasicMenu = (props: PropsType) => {
  return (
    <div>
      <div onClick={props.callBack}>
        <img src={props.icon} alt={`icon ${props.icon}`} /> {props.name}
      </div>
    </div>
  )
}
