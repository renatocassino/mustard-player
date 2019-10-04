import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { observer, Provider, inject } from "mobx-react"
import { observable, decorate } from "mobx"
import { compose } from 'recompose'
import { Player } from './components/Player'
import './App.css'

import stores from './store'

window.store = stores

class State {
  text = ""
  onChange = e => this.text = e.target.value
};

decorate(State, { text: observable })

const appState = new State()

const App = ({ store: {text, onChange} }) => {
  return (
    <div>
      Display: {text} <br />
      <input type="text" onChange={onChange} />
      <Player />
    </div>
  )
}

const AppDecorated = compose(
  inject('store'),
  observer,
)(App)

const Blah = () => {
  return (
    <MuiThemeProvider>
      <Provider {...stores} store={appState}>
        <AppDecorated />
      </Provider>
    </MuiThemeProvider>
  )
}

export default Blah;
