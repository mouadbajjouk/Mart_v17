import { Component, effect, inject } from '@angular/core';
import { OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { AuthService } from '../../../../../core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { Router, RouterLink } from '@angular/router';
import { HeaderData } from './header.data';

@Component({
    selector: 'app-header',
    imports: [
        MenubarModule,
        BadgeModule,
        AvatarModule,
        InputTextModule,
        RippleModule,
        CommonModule,
        ButtonModule,
        RouterLink
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = HeaderData;
  }

  navigateTo(link: string): void {
    this.router.navigateByUrl(link);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.authService.currentUserSig.set(null);
    location.href = '/';
  }
}
