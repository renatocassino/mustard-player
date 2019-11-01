import { observable, decorate, computed } from 'mobx';

class Playlist {
  currentSong = null
  songs = []

  get song() {
    return this.songs[this.currentSong]
  }

  addSongToPlaylist(song, mustLoad = false) {
    this.songs.push(song)

    if (this.currentSong === null) {
      this.currentSong = 0
    }

    if (mustLoad) {
      this.currentSong = this.songs.length - 1
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

  deleteSong(index) {
    const newSongs = this.songs
      .map((song, idx) => idx === index ? null : song)
      .filter(s => s)

    this.songs.replace(newSongs)
    if (this.currentSong >= index) this.currentSong -= 1
    if (this.currentSong < 0) this.currentSong = null
  }
}

decorate(Playlist, {
  currentSong: observable,
  songs: observable,
  song: computed,
})

const playlist = new Playlist()

export default playlist
