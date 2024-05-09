import { AuthService } from './core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { User } from './user.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  httpClient = inject(HttpClient);

  title = 'mart';

  ngOnInit(): void {
    this.httpClient.get<User>('https://localhost:5001/api/users/me').subscribe({
      next: response => {
        this.authService.currentUserSig.set(response);
      },
      error: () => {
        this.authService.currentUserSig.set(null);
      },
    });
  }
}
