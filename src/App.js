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
import { Grid } from '@material-ui/core'
import Header from './components/Header'

window.store = stores

const App = () => {
  return (
    <MuiThemeProvider
      //muiTheme={getMuiTheme(darkBaseTheme)}
    >
      <Provider {...stores}>
        <div>
          <Header />
          <Container>
            <Logo />
            <Player />
            <Grid container>
              <Grid item xs={3}>
                <AutoCompleteRhyme />
              </Grid>
              <Grid item xs={9}>
                <Lyrics />
              </Grid>
            </Grid>
            <TutorialBar />
          </Container>
          Version {version}
        </div>
      </Provider>
    </MuiThemeProvider>
  )
}

export default App
