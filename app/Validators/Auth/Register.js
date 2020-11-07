'use strict'

class AuthRegister {
  get rules () {
    return {
      username: 'required|alpha_numeric|unique:users,username',
      name: 'required',
      password: 'required|min:6'
    }
  }

  get messages () {
    return {
      'username.unique': 'This username is already taken'
    }
  }
}

module.exports = AuthRegister
