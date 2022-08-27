import React from 'react'

import { toast } from 'react-toastify'

import { ButtonWithLoader } from '../ButtonWithLoader/ButtonWithLoader'
import SuperInputText from '../c1-SuperInputText/SuperInputText'
import SuperButton from '../c2-SuperButton/SuperButton'
import SuperCheckbox from '../c3-SuperCheckbox/SuperCheckbox'
import { ToastMesssage } from '../Toast/ToastMesssage'

export function TastsPage() {
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
        <ToastMesssage />
      </div>
    </div>
  )
}
