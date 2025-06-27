import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../../../../core/services/http.service';
import { Role } from '../../../../../domain/role';
import { Endpoint } from '../../../../../core/enums/endpoint';
@Injectable({
  providedIn: 'root',
})
export class RoleService {
  httpService = inject(HttpService);

  getRoles(): Observable<Role[]> {
    return this.httpService.get<Role[]>(Endpoint.GET_ROLES);
  }
}
