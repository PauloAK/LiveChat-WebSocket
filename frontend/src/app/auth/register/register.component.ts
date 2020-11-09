import { UtilsService } from './../../helpers/utils.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../common/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading : boolean = false;

  constructor(
    private authService : AuthService,
    private router : Router,
    private toastr : ToastrService,
    private formBuilder: FormBuilder,
    private utils : UtilsService
  ) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      password: [null, [ Validators.required, Validators.minLength(6) ] ]
    });

  }

  async onSubmit() {
    this.loading = true;
    try {
      this.authService.register(this.registerForm.value).subscribe(
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
        let messages = this.utils.buildErrorMessage(error);
        this.toastr.error(messages);
      });
    } catch (error) {
      this.loading = false;
      this.toastr.error(error);
    }
  }

}
