import React from 'react'

import ovalIcon from '../../../../assets/img/Group 1400.svg'
import deleteIcon from '../../../../assets/svg/Delete.svg'
import editIcon from '../../../../assets/svg/Edit.svg'
import learnIcon from '../../../../assets/svg/teacher.svg'
import { BasicMenu } from '../../../../common/components/basicMenu/BasicMenu'
import { ButtonBasicMenu } from '../../../../common/components/basicMenu/buttonProfile/ButtonBasicMenu'
import { ButtonWithLoader } from '../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'

import s from './TitleBlock.module.css'

type PropsType = {
  title: string
  buttonName?: string
  buttonCallback?: () => void
  isMyPack?: boolean
  buttonVisability?: 'hidden' | 'visible'
  callbackTitle?: () => void
}

export const TitleBlock = ({
  title,
  buttonName,
  buttonCallback,
  isMyPack,
  buttonVisability = 'visible',
  callbackTitle,
}: PropsType) => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading = loading === 'loading'

  const dispatch = useAppDispatch()

  const onClickHandlerEdit = () => {
    alert('Edit!')
  }
  const onClickHandlerDelete = () => {
    alert('Delete!')
  }
  const onClickHandlerLearn = () => {
    alert('Learn!')
  }

  const buttonEdit = <ButtonBasicMenu icon={editIcon} name="Edit" callBack={onClickHandlerEdit} />
  const buttonDelete = (
    <ButtonBasicMenu icon={deleteIcon} name="Delete" callBack={onClickHandlerDelete} />
  )
  const buttonLearn = (
    <ButtonBasicMenu icon={learnIcon} name="Learn" callBack={onClickHandlerLearn} />
  )

  const arrButton = [buttonEdit, buttonDelete, buttonLearn]

  return (
    <div>
      <div className={s.title}>
        <div style={{ display: 'flex' }}>
          <h2 onClick={callbackTitle}>{title}</h2>
          <div style={{ lineHeight: '68px' }}>
            <BasicMenu
              label={isMyPack && <img src={ovalIcon} alt="ovalIcon" />}
              items={arrButton}
              style={{ margin: '8px 0 0 -50px' }}
            />
          </div>
        </div>

        <ButtonWithLoader
          name={buttonName}
          onClick={buttonCallback}
          isLoading={isLoading}
          visibility={buttonVisability}
        />
      </div>
    </div>
  )
}
