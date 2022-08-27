import React from 'react'

import { ButtonWithLoader } from '../ButtonWithLoader/ButtonWithLoader'
import SuperInputText from '../c1-SuperInputText/SuperInputText'
import SuperButton from '../c2-SuperButton/SuperButton'
import SuperCheckbox from '../c3-SuperCheckbox/SuperCheckbox'

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
    </div>
  )
}
