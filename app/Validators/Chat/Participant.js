'use strict'

class ChatParticipant {
  get rules () {
    return {
      user_id: 'required|exists:users,id'
    }
  }
}

module.exports = ChatParticipant
