import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  loginForm : FormGroup;
  loading : boolean = false;

  constructor(
    private authService : AuthService,
    private router : Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, [ Validators.required, Validators.minLength(6) ] ]
    });

  }

  async onSubmit() {
    this.loading = true;
    try {
      this.authService.login(this.loginForm.value).subscribe(
      success => {
        this.loading = false;
        this.toastr.success(success.message);
        // Save the bearer token
        window.localStorage.setItem('token', success.token);
        window.localStorage.setItem('user', JSON.stringify(success.user));
        // Redirect to homepage
        this.router.navigate(['']);
      },
      error => {
        this.loading = false;
        this.toastr.error('Wrong username or password');
      });
    } catch (error) {
      this.loading = false;
      this.toastr.error(error);
    }
  }

}
