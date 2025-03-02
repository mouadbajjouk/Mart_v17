import { HttpService } from './../../../core/services/http.service';
import { Component, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { Endpoint } from '../../../core/enums/endpoint';
import { Router } from '@angular/router';
import { UserRegister } from './userRegister.interface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Error } from '../../../core/interfaces/error.interface';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-register',
    imports: [
        InputTextModule,
        ButtonModule,
        PasswordModule,
        FormsModule,
        JsonPipe,
        ToastModule,
    ],
    templateUrl: './register.component.html',
    styleUrl: './register.component.scss'
})
export class RegisterComponent {
  httpService = inject(HttpService);
  router = inject(Router);
  messageService = inject(MessageService);

  userRegister: UserRegister = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  onSubmit() {
    this.httpService.post(Endpoint.REGISTER, this.userRegister).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Registered successfully!',
          detail: 'Please login with your account.',
          life: 3000,
        });
        this.router.navigate(['auth/login']);
      },
      error: (e: HttpErrorResponse) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration error!',
          detail: `${e.error.detail}`,
          life: 3000,
        });
      },
    });
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }

  goToHome() {
    this.router.navigate(['']);
  }
}
