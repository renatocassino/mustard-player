import { observable, decorate, computed } from 'mobx';

class Playlist {
  currentSong = null
  songs = []

  get song() {
    return this.songs[this.currentSong]
  }

  addSongToPlaylist(song) {
    this.songs.push(song)

    if (this.currentSong === null) {
      this.currentSong = 0
    }
  }

  addCuePoint(cuePoint) {
    if (!this.song) return
    this.song.cuePoints.push(cuePoint)
  }

  updateCuePoint(cuePoint) {
    if (!this.song) return

    this.song.cuePoints = this.song.cuePoints.map((currentCuePoint) => {
      return currentCuePoint.id === cuePoint.id
        ? cuePoint
        : currentCuePoint
    })
  }

  removeCuePoint(id) {
    if (!this.song) return
    this.song.cuePoints = this.song.cuePoints.filter((cuePoint) => cuePoint.id !== id)
  }
}

decorate(Playlist, {
  currentSong: observable,
  songs: observable,
  song: computed,
})

const playlist = new Playlist()

export default playlist
