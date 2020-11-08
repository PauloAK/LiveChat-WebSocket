import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { UtilsService } from './../helpers/utils.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private http : HttpClient,
    private router : Router,
    private utils : UtilsService
  ) { }

  list (chat_id : number) : Observable<Message[]> {
    return this.http.get<Message[]>( `${environment.apiURL}/chats/${chat_id}/messages`, { headers: this.utils.headers() } );
  }

  create (chat_id : number, message : Message) {
    return this.http.post( `${environment.apiURL}/chats/${chat_id}/messages`, message, { headers: this.utils.headers() } );
  }
}
