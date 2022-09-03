import React from 'react'

import style from './CancelButton.module.css'

type PropsType = {
  callBack: (value: boolean) => void
}

export const CancelButton = (props: PropsType) => {
  const onClickHandler = () => {
    props.callBack(false)
  }

  return (
    <>
      <button className={style.cancelButton} onClick={onClickHandler}>
        Cancel
      </button>
    </>
  )
}
