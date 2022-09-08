import React from 'react'

import ovalIcon from '../../../../assets/img/Group 1400.svg'
import deleteIcon from '../../../../assets/svg/Delete.svg'
import editIcon from '../../../../assets/svg/Edit.svg'
import learnIcon from '../../../../assets/svg/teacher.svg'
import { BasicMenu } from '../../../../common/components/basicMenu/BasicMenu'
import { ButtonBasicMenu } from '../../../../common/components/basicMenu/buttonProfile/ButtonBasicMenu'
import { ButtonWithLoader } from '../../../../common/components/buttonWithLoader/ButtonWithLoader'
import { useAppDispatch, useAppSelector } from '../../../../common/hooks/hooks'
import { changePackModalStatus, setIdPack, setPackData } from '../../packReducer'

import s from './TitleBlock.module.css'

type PropsType = {
  idPack?: string
  title: string
  buttonName?: string
  buttonCallback?: () => void
  packId?: string
  isMyPack?: boolean
  buttonVisability?: 'hidden' | 'visible'
  callbackTitle?: () => void
}

export const TitleBlock = ({
  title,
  buttonName,
  buttonCallback,
  isMyPack,
  packId,
  buttonVisability = 'visible',
  callbackTitle,
}: PropsType) => {
  const loading = useAppSelector(state => state.app.status)
  const isLoading = loading === 'loading'

  const idPack = useAppSelector(state => state.cards.queryParams.cardsPack_id)
  const namePack = useAppSelector(state => state.cards.packName)

  const dispatch = useAppDispatch()

  // const onClickHandlerEdit = () => {}
  // const onClickOpenModalWindowDeletePackHandler = () => {
  //   dispatch(changePackModalStatus('modalDelete', true))
  //   dispatch(setIdPack(idPack))
  //   dispatch(setNamePack(namePack))

  const onClickHandlerEdit = () => {
    dispatch(changePackModalStatus('modalEdit', true))
    if (packId) {
      dispatch(setPackData(packId, title))
    }
  }
  const onClickHandlerDelete = () => {
    alert('Delete!')
  }
  const onClickHandlerLearn = () => {}

  const buttonEdit = <ButtonBasicMenu icon={editIcon} name="Edit" callBack={onClickHandlerEdit} />
  const buttonDelete = (
    <ButtonBasicMenu
      icon={deleteIcon}
      name="Delete"
      callBack={onClickOpenModalWindowDeletePackHandler}
    />
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
            {isMyPack && (
              <BasicMenu
                label={<img src={ovalIcon} alt="ovalIcon" />}
                items={arrButton}
                style={{ margin: '8px 0 0 -50px' }}
              />
            )}
          </div>
        </div>

        <ButtonWithLoader
          name={buttonName}
          styleButton={'defaultButton'}
          onClick={buttonCallback}
          isLoading={isLoading}
          visibility={buttonVisability}
        />
      </div>
    </div>
  )
}
