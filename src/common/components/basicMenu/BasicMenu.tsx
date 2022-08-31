import React, { useState } from 'react'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

type PropsType<T> = {
  label?: any
  items?: Array<T>
  style?: any
}

export const BasicMenu = (props: PropsType<any>) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {props.label}
      </Button>
      <Menu
        style={props.style ? props.style : ''}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {props.items &&
          props.items.map(i => (
            <MenuItem onClick={handleClose} key={i}>
              {i}
            </MenuItem>
          ))}
      </Menu>
    </div>
  )
}
