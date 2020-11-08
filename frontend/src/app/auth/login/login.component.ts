import { User } from './../../interfaces/user';
import { AuthService } from './../common/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login : User = {}; 

  constructor(
    private authService : AuthService,
    private router : Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    try {
      this.authService.login(this.login).subscribe(
      success => {
        this.toastr.success(success.message);
        // Save the bearer token
        window.localStorage.setItem('token', success.token);
        // Redirect to homepage
        this.router.navigate(['']);
      },
      error => {
        this.toastr.error('Wrong username or password');
      });
    } catch (error) {
      this.toastr.error(error);
      console.log('Teste', error);
    }
  }

}
