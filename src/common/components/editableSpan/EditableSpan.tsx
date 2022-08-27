import React, { ChangeEvent, useState } from 'react'

import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
  disableEditMode?: boolean
}

export function EditableSpan({ value, onChange, disableEditMode = false }: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false)
  let [title, setTitle] = useState(value)

  const activateEditMode = () => {
    if (!disableEditMode) {
      setEditMode(true)
      setTitle(value)
    }
  }
  const activateViewMode = () => {
    setEditMode(false)
    onChange(title)
  }
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode ? (
    <>
      <input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
      <FontAwesomeIcon
        // className={s.eye}
        onClick={activateViewMode}
        icon={faFloppyDisk}
        title={'change avatar'}
      />
    </>
  ) : (
    <span onDoubleClick={activateEditMode}>{value}</span>
  )
}
