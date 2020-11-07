'use strict'

class MessageStore {
  get rules () {
    return {
      content: 'required|string'
    }
  }
}

module.exports = MessageStore
