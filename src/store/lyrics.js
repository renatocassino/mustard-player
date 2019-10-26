import { observable, decorate } from 'mobx'
import { getLyrics, saveLyric, deleteLyric } from '../api/lyrics'

const initialStateLyric = {
  title: '',
  lyric: '',
}

class Lyrics {
  lyric = null
  list = null

  async loadLyrics() {
    if (this.list) return
    const lyrics = await getLyrics()
    if (lyrics) {
      this.list = lyrics.data
    }
  }

  newLyric() {
    this.lyric = { ...initialStateLyric }
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

  async saveLyric() {
    const response = await saveLyric(this.lyric)
    if (response) this.updateLyric(response.data)
    this.resetLyric()
  }

  updateLyric(data) {
    this.lyric = data
    this.list = this.list.map(lyric => lyric.id === data.id
      ? data
      : lyric
    )
  }

  async delete(id) {
    await deleteLyric(id)
    this.lyric = null
    this.list = this.list.map(lyric => lyric.id === id
      ? null
      : lyric
    ).filter(l => l)
  }
}

decorate(Lyrics, {
  lyric: observable,
  list: observable,
})

const lyric = new Lyrics()

export default lyric
