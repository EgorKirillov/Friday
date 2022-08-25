import React from 'react'

import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import avatar from '../../../assets/img/avatar.jpg'
import SuperButton from '../../../common/components/c2-SuperButton/SuperButton'

import { EditableSpan } from './EditableSpan'
import s from './Profile.module.css'

export function Profile() {
  const addPhoto = () => {
    alert('add foto')
  }
  const changeNameHandler = (name: string) => {
    alert(name)
  }

  return (
    <div className={s.container}>
      <div className={s.title}> It-incubator</div>
      <h1 className={s.title}>Personal Infomation</h1>

      <div className={s.avatarContainer}>
        <img className={s.avatar} src={avatar} alt="" />
        <FontAwesomeIcon
          className={s.eye}
          onClick={addPhoto}
          icon={faCamera}
          title={'change avatar'}
        />
      </div>

      <div>
        <div>Nickname</div>
        <EditableSpan
          value={'name'}
          onChange={name => changeNameHandler(name)}
          disableEditMode={false}
        />
      </div>
      <div>email</div>
      <div>
        <SuperButton>logout button</SuperButton>
      </div>
    </div>
  )
}
