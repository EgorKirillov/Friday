import React from 'react'

import { ButtonWithLoader } from '../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { useAppSelector } from '../../../../common/hooks/hooks'

export const PackIsEmpty = ({
  callback,
  isMyPack,
}: {
  callback: () => void
  isMyPack: boolean
}) => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading: boolean = loading === 'loading'

  return (
    <div>
      <div>This pack is empty. {isMyPack && <span>add new card to fill this pack</span>}</div>
      <ButtonWithLoader
        name={'Add new card'}
        isLoading={isLoading}
        onClick={callback}
        visibility={isMyPack ? 'visible' : 'hidden'}
        styleButton={'defaultButton'}
      />
    </div>
  )
}
