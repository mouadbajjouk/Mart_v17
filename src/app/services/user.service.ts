import { inject, Injectable } from '@angular/core';
import { HttpService } from '../core/services/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpService = inject(HttpService);
}
