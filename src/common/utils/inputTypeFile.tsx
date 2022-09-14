import React, { ChangeEvent } from 'react'

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { IconButton } from '@mui/material'
import { toast } from 'react-toastify'

type InputTypeFileType = {
  name: string
  callback: (file64: string) => void
}
export const InputTypeFile = (props: InputTypeFileType) => {
  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0]

      if (file.size < 4000000) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const file64 = reader.result as string

          props.callback(file64)
        }
        reader.readAsDataURL(file)
      } else {
        toast.error('Файл слишком большого размера')
      }
    }
  }

  // ------------если через кнопку делать
  // const inputRef = useRef<HTMLInputElement>(null)
  // const selectFileHandler = () => {
  //   inputRef && inputRef.current?.click()
  // }

  // <div>
  //   <ButtonWithLoader name={props.name} onClick={selectFileHandler} />
  //   <input type="file" onChange={uploadHandler} ref={inputRef} style={{ display: 'none' }} />
  // </div>
  //-------------------------------------
  return (
    <label>
      <input type="file" onChange={uploadHandler} style={{ display: 'none' }} />
      <IconButton component="span">
        <AddAPhotoIcon />
      </IconButton>
    </label>
  )
}
