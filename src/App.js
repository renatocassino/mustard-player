import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { Provider } from "mobx-react"
import { Player } from './components/Player'
import TutorialBar from './components/TutorialBar'
import stores from './store'
import { AutoCompleteRhyme } from './components/AutoCompleteRhyme'
import { version } from '../package.json'
import './App.css'

window.store = stores

const App = () => {
  let baseUrl = ''

  if (typeof window !== 'undefined' && window.location.host.match(/github/i)) {
    baseUrl = 'https://raw.githubusercontent.com/tacnoman/rapletter/master/public'
  }

  return (
    <MuiThemeProvider>
      <Provider {...stores}>
        <div>
          <div><img src={`${baseUrl}/logo.png`} alt="Mustard Player" /></div>
          <Player />
          <TutorialBar />
          <AutoCompleteRhyme />
          Version {version}
        </div>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
