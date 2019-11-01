import fetch from './fetchFactory'

export const getWordsToRhyme = async (word) => {
  try {
    if (word.length < 3) return null

    const response = await fetch(`api/v1/rhymes/pt-br/${word}`)
    const { data } = await response.json()

    return data.words
  } catch (e) {
    console.log(e)
    return null
  }
}
