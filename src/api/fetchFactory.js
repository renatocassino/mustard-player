import fetch from 'node-fetch'

export default (url, data) => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000'

  return (
    fetch(`${API_URL}/${url}?token=${sessionStorage.token}`, {
      ...data,
      mode: 'cors',
    })
  )
}
