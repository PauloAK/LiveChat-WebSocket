'use strict'



class WebsocketController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onConnect () {
    console.log('Socket Connected');
  }
  
}

module.exports = WebsocketController
