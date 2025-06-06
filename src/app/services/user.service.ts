import { inject, Injectable } from '@angular/core';
import { HttpService } from '../core/services/http.service';
import { User } from '../user.interface';
import { Observable } from 'rxjs';
import { Endpoint } from '../core/enums/endpoint';

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

  editUser(user: User): Observable<User> {
    // TODO: ADD AUTH !!!!
    let formData = this.GetUserFormData(user);

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
      body: { ids },
    });
  }

  private GetUserFormData(user: User) {
    let formData = new FormData();

    if (user.id) formData.append('id', user.id);
    if (user.firstName) formData.append('firstname', user.firstName);
    if (user.lastName) formData.append('lastname', user.lastName);
    if (user.email) formData.append('email', user.email);

    // Append each file individually
    if (user.profileImage) {
      if (user.profileImage instanceof File) {
        formData.append(
          'profileImage',
          user.profileImage,
          user.profileImage.name
        ); // key must match parameter name in C#
      }
    }
    return formData;
  }
}
