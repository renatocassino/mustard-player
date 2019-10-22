import fetch from './fetchFactory'

export const getLyrics = async () => {
  try {
    const response = await fetch('/api/v1/lyrics')
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}

export const saveLyric = async (lyric) => {
  try {
    const url = lyric.id
      ? `/api/v1/lyrics/${lyric.id}`
      : '/api/v1/lyrics'
    
    const response = await fetch(url, {
      method: lyric.id ? 'PUT' : 'POST',
      body: JSON.stringify(lyric)
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
  }
}
