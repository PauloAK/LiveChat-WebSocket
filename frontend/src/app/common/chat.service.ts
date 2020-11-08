import { Observable } from 'rxjs';
import { Chat } from './../interfaces/chat';
import { UtilsService } from './../helpers/utils.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private http : HttpClient,
    private router : Router,
    private utils : UtilsService
  ) { }

  list () : Observable<Chat[]> {
    return this.http.get<Chat[]>( `${environment.apiURL}/chats`, { headers: this.utils.headers() } );
  }

  create (chat : Chat) {
    return this.http.post( `${environment.apiURL}/chats`, chat, { headers: this.utils.headers() } );
  }

  show (chat_id : number) : Observable<Chat> {
    return this.http.get<Chat>( `${environment.apiURL}/chats/${chat_id}`, { headers: this.utils.headers() } );
  }

  participants (chat_id : number) {
    return this.http.get( `${environment.apiURL}/chats/${chat_id}/participants`, { headers: this.utils.headers() } );
  }

  delete (chat_id : number) {
    return this.http.delete( `${environment.apiURL}/chats/${chat_id}`, { headers: this.utils.headers() } );
  }
}
