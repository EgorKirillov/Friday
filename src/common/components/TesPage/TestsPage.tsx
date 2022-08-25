import React from 'react'

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
    </div>
  )
}
