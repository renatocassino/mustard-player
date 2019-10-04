import React from 'react';
import './App.css';
import { observer, Provider, inject } from "mobx-react";
import { observable, decorate } from "mobx";

import stores from './store'

class State {
  text = ""
  onChange = e => this.text = e.target.value
};

decorate(State, { text: observable })

const appState = new State()

const App = inject('store')(inject('playlist')(
  observer(({ store: {text, onChange}, playlist }) => {
    console.log(playlist)
  return (
    <div>
      Display: {text} <br />
      <input type="text" onChange={onChange} />

      <button onClick={() => playlist.addSongToPlaylist(Math.random())}>+</button>

      {playlist.songs.map((s) => <div>{s}</div>)}
    </div>
  )
})))

const Blah = () => {
  return (
    <Provider {...stores} store={appState}>
      <App />
    </Provider>
  )
}

export default Blah;
