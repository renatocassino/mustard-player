import fetch from 'node-fetch'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

export default (url, data) => (
  fetch(`${API_URL}/${url}?token=${sessionStorage.token}`, {
    ...data,
    mode: 'cors',
  })
)
