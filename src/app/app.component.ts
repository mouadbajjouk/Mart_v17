import { HttpService } from './core/services/http.service';
import { AuthService } from './core/services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { User } from './user.interface';
import { HeaderComponent } from './layout/layout/basic/components/header/header.component';
import { FooterComponent } from './layout/layout/basic/components/footer/footer.component';
import { Endpoint } from './core/enums/endpoint';
import { catchError, throwError, timeout } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService],
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  httpService = inject(HttpService);

  title = 'mart';
  isServerDown = false;
  isLoading = true;

  ngOnInit(): void {
    this.httpService
      .get<User>(Endpoint.ME)
      .pipe(
        timeout(5),
        catchError(error => {
          console.error('API Timeout or Error:', error);
          this.isLoading = false;
          this.isServerDown = true; // Activate error flag
          this.authService.currentUserSig.set(null);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: response => {
          this.authService.currentUserSig.set(response);
          this.isLoading = false;
        },
        error: () => {
            this.authService.currentUserSig.set(null);
        },
      });
  }
}
