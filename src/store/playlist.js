import { observable, decorate } from 'mobx';

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
}

decorate(Playlist, {
  currentSong: observable,
  songs: observable,
})

const playlist = new Playlist()

export default playlist
