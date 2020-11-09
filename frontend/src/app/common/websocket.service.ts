import { OnDestroy, OnInit, Injectable } from '@angular/core';
import * as Ws from "@adonisjs/websocket-client";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy{

  private socket;
  private channel;
  private onMessageCallback;

  constructor() { }

  connect(topic : string) {
    if (this.channel)
      this.channel.close();

    const wsUrl = "ws://127.0.0.1:3333";
    this.socket = Ws(wsUrl);

    this.socket.connect();

    this.channel = this.socket.subscribe(topic);

    this.channel.on("message", event => {
      this.onMessageCallback(event);
    });
  }

  sendMessage(content) {
    this.channel.emit("message", content);
  }

  ngOnDestroy() {
    this.channel.close();
  }

  public onMessage(callback) {
    this.onMessageCallback = callback;
  }
  
}
