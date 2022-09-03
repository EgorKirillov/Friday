import React from 'react'

import style from './SaveButton.module.css'

type PropsType = {
  saveNewName: () => void
}
export const SaveButton = (props: PropsType) => {
  return (
    <>
      <button className={style.saveButton} onClick={props.saveNewName}>
        Save
      </button>
    </>
  )
}
