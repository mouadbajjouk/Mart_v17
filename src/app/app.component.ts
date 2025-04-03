import { HttpService } from './core/services/http.service';
import { AuthService } from './core/services/auth.service';
import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { User } from './user.interface';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { Endpoint } from './core/enums/endpoint';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        ToastModule,
        HeaderComponent,
        FooterComponent,
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    providers: [MessageService]
})
export class AppComponent implements OnInit {
  authService = inject(AuthService);
  httpService = inject(HttpService);

  title = 'mart';

  ngOnInit(): void {
    this.httpService.get<User>(Endpoint.ME).subscribe({
      next: response => {
        this.authService.currentUserSig.set(response);
      },
      error: () => {
        this.authService.currentUserSig.set(null);
      },
    });
  }
}
