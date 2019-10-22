import { observable, decorate } from 'mobx'
import { getLyrics } from '../api/lyrics'

class Lyrics {
  lyric = null
  list = null

  async loadLyrics() {
    if (this.list) return
    const lyrics = await getLyrics()
    this.list = lyrics.data
  }

  newLyric() {
    this.lyric = {
      title: '',
      lyric: '',
    }
  }

  resetLyric() {
    this.lyric = null
  }

  setLyricById(id) {
    const lyric = this.list.find(lyric => lyric.id === id)
    if (lyric) this.lyric = {...lyric}
  }

  setTitle(title) {
    this.lyric.title = title
  }

  setLyric(lyric) {
    this.lyric.lyric = lyric
  }

  saveLyric() {
    
  }
}

decorate(Lyrics, {
  lyric: observable,
  list: observable,
})

const lyric = new Lyrics()

export default lyric
