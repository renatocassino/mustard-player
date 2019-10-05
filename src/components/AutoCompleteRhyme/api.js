import fetch from 'node-fetch'

export const getWordsToRhyme = async (word) => {
  try {
    const response = await fetch(`http://localhost:8000/api/v1/words/pt-br/${word}`)
    const { data } = await response.json()

    return data.words.slice(0, 30)
  } catch (e) {
    console.log(e)
    return null
  }
}
