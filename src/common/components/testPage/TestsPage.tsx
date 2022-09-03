import React, { useState } from 'react'

import { toast } from 'react-toastify'

import deleteIcon from '../../../assets/svg/Delete.svg'
import { ButtonWithLoader } from '../buttonWithLoader/ButtonWithLoader'
import { DeleteCard } from '../modalWindow/DeleteCard'
import SuperButton from '../superButton/SuperButton'
import SuperCheckbox from '../superCheckbox/SuperCheckbox'
import SuperInputText from '../superInputText/SuperInputText'
import { ToastMessage } from '../toast/ToastMessage'

const Img = () => {
  return <img src={deleteIcon} alt="" style={{ margin: '0 5px', width: 'auto' }} />
}

export function TestsPage() {
  // const array = [<ContentAddNewPack key={'1'} />, <Img key={'2'} />]

  const [open, setOpen] = useState(false)

  return (
    <div>
      test page
      <div>
        input <SuperInputText />
      </div>
      <div>
        <SuperButton>button</SuperButton>
      </div>
      <div>
        <SuperCheckbox />
        checkbox
      </div>
      <div>
        <p>button with loader isLoading=true</p>
        <ButtonWithLoader name={'button with loader'} isLoading={true} />
        <p>button with loader isLoading=false</p>
        <ButtonWithLoader name={'button with loader'} isLoading={false} />
      </div>
      <div>
        <button onClick={() => toast.info('info')}>info</button>
        <button onClick={() => toast.warn('warning')}>warning</button>
        <button onClick={() => toast.error('error')}>error</button>
        <ToastMessage />
      </div>
      <div>
        <DeleteCard />
      </div>
      <div></div>
    </div>
  )
}
