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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    JsonPipe,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
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
    this.httpService
      .post(Endpoint.REGISTER, this.userRegister)
      .subscribe();

    this.messageService.add({
      severity: 'success',
      summary: 'Registered successfully!',
      detail: 'Please login with your account.',
      life: 3000
    });

    this.router.navigate(['auth/login']);
  }

  goToLogin() {
    this.router.navigate(['auth/login']);
  }
}
