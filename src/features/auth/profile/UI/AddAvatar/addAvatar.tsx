import React, { ChangeEvent, useRef } from 'react'

import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { toast } from 'react-toastify'

import { useAppDispatch } from '../../../../../common/hooks/hooks'
import { convertFileToBase64 } from '../../../../../common/utils/convertFileToBase64'
import { updateProfile } from '../../profileReducer'

export const AddAvatar = () => {
  const dispatch = useAppDispatch()

  const inRef = useRef<HTMLInputElement>(null)

  const onClickUploadHandler = () => {
    inRef && inRef.current?.click()
  }

  const upload = (e: ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();
    // const formData = new FormData() // for send to back

    const newFile = e.target.files && e.target.files[0]

    if (newFile) {
      if (newFile.size > 204800) {
        toast.error('max 200 kB')
      } else {
        convertFileToBase64(newFile, (file64: string) => {
          dispatch(updateProfile({ avatar: file64 }))
        })
      }
    }
  }

  return (
    <div style={{ color: '#366EFF' }}>
      <PersonAddIcon
        onClick={onClickUploadHandler}
        fontSize={'large'}
        style={{ marginLeft: '-20px' }}
        color={'inherit'}
      />
      <input
        ref={inRef}
        type={'file'}
        onChange={upload}
        accept={'image/*'}
        style={{ display: 'none' }}
      />
    </div>
  )
}
