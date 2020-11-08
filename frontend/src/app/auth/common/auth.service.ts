import { User } from './../../interfaces/user';
import { Auth } from './../../interfaces/auth';
import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http : HttpClient,
    private router : Router
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
}
