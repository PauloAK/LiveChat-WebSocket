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
    private messageService : MessageService
  ) { }

  ngOnInit(): void {
    this.loadChats();
  }

  openChat(chat : Chat){
    this.currentMessage = null;
    this.currentChat = null;
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
      content: this.currentMessage
    }

    this.currentMessage = null;

    this.messageService.create(this.currentChat.id, message).subscribe(
      success => {
        this.currentChat.messages.push(message);
      }
    );
  }

}
