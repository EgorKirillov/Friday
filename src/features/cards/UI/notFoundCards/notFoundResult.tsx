import React from 'react'

import { ButtonWithLoader } from '../../../../common/components/buttonWithLoader/ButtonWithLoader'

type PropsType = {
  isLoading: boolean
  buttonName: string
  buttonCallback: () => void
}

export const NotFoundResult = (props: PropsType) => {
  return (
    <div>
      <h3>Not found</h3>
      <ButtonWithLoader
        name={props.buttonName}
        onClick={props.buttonCallback}
        size={'small'}
        isLoading={props.isLoading}
      />
    </div>
  )
}
