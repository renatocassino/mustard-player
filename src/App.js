import React from 'react'
import { Provider } from "mobx-react"
import { Player } from './components/Player'
import { ApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-boost'
import TutorialBar from './components/TutorialBar'
import stores from './store'
import { AutoCompleteRhyme } from './components/AutoCompleteRhyme'
import Container from '@material-ui/core/Container'
import { version } from '../package.json'
import Logo from './components/Logo'
import Lyrics from './components/Lyrics'
import './App.css'
import { Grid } from '@material-ui/core'
import Header from './components/Header'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/deepPurple';
import green from '@material-ui/core/colors/yellow';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'http://localhost:4000/graphql'
})

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
  status: {
    danger: 'orange',
  },
});

window.store = stores

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Provider {...stores}>
          <div>
            <Header />
            <Container>
              <Logo />
              <Player />
              <Grid container>
                <Grid item xs={12} md={3}>
                  <AutoCompleteRhyme />
                </Grid>
                <Grid item xs={12} md={9}>
                  <Lyrics />
                </Grid>
              </Grid>
              <TutorialBar />
            </Container>
            Version {version}
          </div>
        </Provider>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
