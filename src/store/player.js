import { observable, decorate, computed } from 'mobx';

class Player {
  isPlaying = false
  loopActive = false

  togglePlaying() {
    this.isPlaying = !this.isPlaying
  }

  stop() {
    this.isPlaying = false
  }
}

decorate(Player, {
  isPlaying: observable,
  loopActive: observable,
})

const player = new Player()

export default player
