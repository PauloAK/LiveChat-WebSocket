import { AuthService } from './../auth/common/auth.service';
import { Injectable, Injector } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  auth = this.injector.get<AuthService>(AuthService);

  constructor( private injector: Injector) { }

  buildErrorMessage(response : any) : string {
    let messages = [];

    if (response.status === 400 && response.error) {
      response.error.forEach(element => {
        messages.push(element.message)
      });
    }

    return messages.join("\n");
  }

  token () : string {
    return `Bearer ${window.localStorage.getItem('token')}`;
  }

  headers () : any {
    return {
      'Accept': 'application/json',
      'Authorization': this.token()
    }
  }

  userId () : number {
    let user = JSON.parse(window.localStorage.getItem('user'));
    return user.id;
  }
}
