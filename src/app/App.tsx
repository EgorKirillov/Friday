import React from 'react'
import './App.css'
import { StartPage } from '../features/mainPage/UI/StartPage'
import { Provider } from 'react-redux'
import { store } from './store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <StartPage />
      </Provider>
    </div>
  )
}

export default App
