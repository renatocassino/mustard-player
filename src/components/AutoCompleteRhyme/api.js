import fetch from 'node-fetch'

export const getWordsToRhyme = async (word) => {
  try {
    let baseUrl = 'http://localhost:8000'
    // if (typeof window !== 'undefined' && window.location.host.match(/github/i)) {
    baseUrl = 'https://mustard-api.herokuapp.com'
    // }

    const response = await fetch(`${baseUrl}/api/v1/rhymes/pt-br/${word}`)
    const { data } = await response.json()

    return data.words.slice(0, 30)
  } catch (e) {
    console.log(e)
    return null
  }
}
