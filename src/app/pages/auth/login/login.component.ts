import { HttpService } from './../../../core/services/http.service';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Endpoint } from '../../../core/enums/endpoint';
import { Router } from '@angular/router';
import { UserLogin } from './userLogin.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { Token } from './token.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    JsonPipe,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  httpService = inject(HttpService);
  router = inject(Router);
  httpClient = inject(HttpClient);
  authService = inject(AuthService);

  userLogin: UserLogin = { email: '', password: '' };

  onSubmit() {
    // this.httpService
    //   .post(Endpoint.LOGIN, this.userLogin)
    //   .subscribe(response => console.log(response));

    this.httpClient
      .post<Token>('https://localhost:5001/api/users/login', this.userLogin)
      .subscribe(response => {
        localStorage.setItem('token', response.accessToken);

        this.router.navigateByUrl('/');
      });
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }
}
