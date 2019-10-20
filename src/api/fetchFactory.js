import fetch from 'node-fetch'

const getBaseUrl = () => {
  let baseUrl = 'http://localhost:8000'
  if (typeof window !== 'undefined' && window.location.host.match(/github/i)) {
    baseUrl = 'http://mustardplayer.io'
  }

  return baseUrl
}

export default (url, data) => {
  return fetch(`${getBaseUrl()}${url}?token=${sessionStorage.token}`, {
    ...data,
    mode: 'cors',
  })
}
