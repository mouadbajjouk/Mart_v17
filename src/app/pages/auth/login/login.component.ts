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
import { AuthService } from '../../../core/services/auth.service';
import { Token } from './token.interface';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    imports: [
        InputTextModule,
        ButtonModule,
        PasswordModule,
        FormsModule,
        JsonPipe,
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})
export class LoginComponent {
  httpService = inject(HttpService);
  router = inject(Router);
  authService = inject(AuthService);
  messageService = inject(MessageService);

  userLogin: UserLogin = { email: '', password: '' };

  onSubmit() {
    this.httpService.post<Token>(Endpoint.LOGIN, this.userLogin).subscribe(
      response => {
        localStorage.setItem('token', response.accessToken);

        location.href = '/home';
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Invalid credentials!',
          detail: 'Please login with your account.',
          life: 3000,
        });
      }
    );
  }

  goToRegister() {
    this.router.navigate(['auth/register']);
  }

  goToHome() {
    this.router.navigate(['']);
  }
}
