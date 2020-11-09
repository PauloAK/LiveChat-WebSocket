import { WebsocketService } from './../../common/websocket.service';
import { UtilsService } from './../../helpers/utils.service';
import { MessageService } from './../../common/message.service';
import { ChatService } from './../../common/chat.service';
import { Component, OnInit } from '@angular/core';
import { Chat } from 'src/app/interfaces/chat';
import { Message } from 'src/app/interfaces/message';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  chats : Array<Chat>;
  currentChat : Chat;
  currentMessage : string;

  constructor(
    private chatService : ChatService,
    private messageService : MessageService,
    public utils : UtilsService,
    private wsService : WebsocketService
  ) { }

  ngOnInit(): void {
    this.loadChats();
  }

  openChat(chat : Chat){
    this.currentMessage = null;
    this.currentChat = null;
    this.wsService.connect(`chat:${chat.id}`);
    this.wsService.onMessage( (message) => {
      this.currentChat.messages.push(message);
    });

    this.chatService.show(chat.id).subscribe(
      chat => {
        this.currentChat = chat;
      }
    );
  }

  loadChats() {
    this.chatService.list().subscribe(
      success => {
        this.chats = success;
      }
    )
  }

  sendMessage(){
    if (!this.currentMessage)
      return;

    let message : Message = {
      content: this.currentMessage,
      user_id: this.utils.userId()
    }

    this.currentMessage = null;

    this.messageService.create(this.currentChat.id, message).subscribe(
      success => {
      }
    );
  }

}
