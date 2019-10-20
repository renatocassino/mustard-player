import { observable, decorate, computed } from 'mobx'
import { getLyrics } from '../api/lyrics'

class Lyrics {
  lyric = null
  list = null

  async loadLyrics() {
    if (this.list) return
    const lyrics = await getLyrics()
    this.list = lyrics.data
  }
}

decorate(Lyrics, {
  lyric: observable,
  list: observable,
})

const lyric = new Lyrics()

export default lyric
