import { observable, decorate, computed } from 'mobx';

class User {
  logged = false
  token = null
  info = {}

  init() {
    if (localStorage.token) {
      this.setToken(localStorage.token)
    }
  }

  setToken(token) {
    if (!token.match(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/)) {
      this.logout()
      return
    }

    this.logged = true
    this.token = token
    localStorage.token = token

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
    localStorage.removeItem('token')
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
