import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from "mobx-react"
import { Player } from './components/Player'
import TutorialBar from './components/TutorialBar'
import './App.css'

import stores from './store'

window.store = stores

const App = () => {
  let baseUrl = ''

  if (typeof window !== 'undefined' && window.location.host.match(/github/i)) {
    baseUrl = 'https://raw.githubusercontent.com/tacnoman/rapletter/master/public'
  }

  return (
    <div>
      <div><img src={`${baseUrl}/logo.png`} alt="Mustard Player" /></div>
      <Player />
      <TutorialBar />
    </div>
  )
}

const Blah = () => {
  return (
    <MuiThemeProvider>
      <Provider {...stores}>
        <App />
      </Provider>
    </MuiThemeProvider>
  )
}

export default Blah;
