import { observable, decorate, computed } from 'mobx';

class User {
  logged = false
  token = null
  info = {}

  init() {
    if (sessionStorage.token) {
      this.setToken(sessionStorage.token)
    }
  }

  setToken(token) {
    if (!token.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
      this.logout()
      return
    }

    this.logged = true
    this.token = token
    sessionStorage.token = token

    this.setInfo()

    window.history.replaceState(null, null, ' ')
  }

  setInfo() {
    const base64 = this.token.split('.')[1]
    const json = Buffer.from(base64, 'base64').toString()
    this.info = JSON.parse(json)
  }

  logout() {
    this.logged = false
    this.token = null
    sessionStorage.removeItem('token')
  }
}

decorate(User, {
  logout: observable,
  setToken: observable,
  init: observable,
  logged: observable,
})

const user = new User()

export default user
