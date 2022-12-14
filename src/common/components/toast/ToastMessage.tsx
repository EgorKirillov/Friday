import React from 'react'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

export const ToastMessage = () => {
  return (
    <ToastContainer
      position="bottom-left"
      autoClose={8000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={true}
      theme={'colored'}
      pauseOnFocusLoss
      pauseOnHover
      style={{ width: 'auto' }}
    />
  )
}
