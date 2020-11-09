import { UtilsService } from './../../helpers/utils.service';
import { User } from './../../interfaces/user';
import { Auth } from './../../interfaces/auth';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient
  ) { }

  login(user: User) : Observable<Auth> {
    return this.http.post<Auth>(`${environment.apiURL}/auth/login`, user, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  register(user: User) {
    return this.http.post<Auth>(`${environment.apiURL}/auth/register`, user, {
      headers: {
        'Accept': 'application/json'
      }
    });
  }

  me() : Observable<User> {
    return this.http.get<User>(`${environment.apiURL}/me`, {
      headers : {
        'Accept': 'application/json',
        'Autorization': `Bearer ${window.localStorage.getItem('token')}`
      }
    });
  }
}
