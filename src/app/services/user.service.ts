import { inject, Injectable } from '@angular/core';
import { HttpService } from '../core/services/http.service';
import { User } from '../user.interface';
import { Observable } from 'rxjs';
import { Endpoint } from '../core/enums/endpoint';
import { Role } from '../domain/role';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  httpService = inject(HttpService);

  getUsers(): Observable<User[]> {
    return this.httpService.get<User[]>(Endpoint.GET_USERS);
  }

  addUser(user: User): Observable<User> {
    // TODO: ADD AUTH !!!!
    let formData = this.GetUserFormData(user);

    return this.httpService.post(Endpoint.ADD_USER, formData);
  }

  editUser(user: User, newRoles: Role[], file: File): Observable<User> {
    console.log('serv file', file);

    // TODO: ADD AUTH !!!!
    let formData = this.GetUserFormData(user, newRoles, file);

    return this.httpService.patch(Endpoint.EDIT_USER, formData);
  }

  deleteUser(id: string) {
    return this.httpService.deleteUsingQuery<boolean>(
      Endpoint.DELETE_USER,
      '/' + id
    );
  }

  deleteUsers(ids: string[]): Observable<boolean> {
    return this.httpService.delete<boolean>(Endpoint.DELETE_USER, {
      body: { usersIds: ids },
    });
  }

  private GetUserFormData(user: User, newRoles?: Role[], file?: File) {
    let formData = new FormData();

    // const payload = {
    //   id:  user.id,
    //   firstname', user.firstName
    //   lastname', user.lastName
    //   email', user.email
    // }

    if (user.id) formData.append('id', user.id);
    if (user.firstName) formData.append('firstname', user.firstName);
    if (user.lastName) formData.append('lastname', user.lastName);
    if (user.email) formData.append('email', user.email);
    if (newRoles) {
      newRoles.forEach(role => {
        formData.append('rolesIds', role.id.toString());
      });
    }

    if (file) {
      formData.append('profileImage', file);
    }

    return formData;
  }
}
