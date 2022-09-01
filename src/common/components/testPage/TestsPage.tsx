import React from 'react'

import { toast } from 'react-toastify'

import { ButtonWithLoader } from '../buttonWithLoader/ButtonWithLoader'
import SuperButton from '../superButton/SuperButton'
import SuperCheckbox from '../superCheckbox/SuperCheckbox'
import SuperInputText from '../superInputText/SuperInputText'
import { ToastMessage } from '../toast/ToastMessage'

export function TestsPage() {
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
      <div>{/*<PackTable />*/}</div>
    </div>
  )
}
