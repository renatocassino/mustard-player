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
