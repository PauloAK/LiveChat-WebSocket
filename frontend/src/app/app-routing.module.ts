import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/common/auth.guard';
import { HomeComponent } from './base/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './layout/base/base.component';
import { AuthComponent } from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      { path: '', component: HomeComponent },
    ],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }