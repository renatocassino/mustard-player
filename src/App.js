import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import { Provider } from "mobx-react"
import { Player } from './components/Player'
import TutorialBar from './components/TutorialBar'
import stores from './store'
import { AutoCompleteRhyme } from './components/AutoCompleteRhyme'
import Container from '@material-ui/core/Container'
import { version } from '../package.json'
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
import Logo from './components/Logo'
import Lyrics from './components/Lyrics'
import './App.css'

window.store = stores

const App = () => {
  return (
    <MuiThemeProvider
      //muiTheme={getMuiTheme(darkBaseTheme)}
    >
      <Provider {...stores}>
        <div>
          <Container>
            <Logo />
            <Player />
            <TutorialBar />
            <AutoCompleteRhyme />
            <Lyrics />
          </Container>
          Version {version}
        </div>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
