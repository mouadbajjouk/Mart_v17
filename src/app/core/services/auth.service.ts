import { Injectable, signal } from '@angular/core';
import { User } from '../../user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUserSig = signal<User | undefined | null>(undefined);

  isLoggedIn(): boolean {
    if (!localStorage.getItem('token')) return false;

    return true;
  }
}
