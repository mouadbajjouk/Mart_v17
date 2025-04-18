import { environment } from './../../../environments/environment';
import { Endpoint } from './../enums/endpoint';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root', //singleton
})
export class HttpService {
  httpClient = inject(HttpClient);
  apiUrl = environment.apiUrl;

  get<T>(endpoint: Endpoint, options?: any): Observable<T> {
    return this.httpClient.get<T>(
      this.apiUrl + endpoint,
      options
    ) as Observable<T>;
  }

  post<T>(endpoint: Endpoint, data: any, options?: any): Observable<T> {
    return this.httpClient.post<T>(
      this.apiUrl + endpoint,
      data,
      options
    ) as Observable<T>;
    // .pipe(catchError(error => this.handleError(error)));
  }

  patch<T>(endpoint: Endpoint, data: any, options?: any): Observable<T> {
    return this.httpClient.patch<T>(
      this.apiUrl + endpoint,
      data,
      options
    ) as Observable<T>;
    // .pipe(catchError(error => this.handleError(error)));
  }

  delete<T>(endpoint: Endpoint, data: any, options?: any): Observable<T> {
    return this.httpClient.delete(
      this.apiUrl + endpoint,
      data
    ) as Observable<T>;
    // .pipe(catchError(error => this.handleError(error)));
  }

  deleteUsingQuery<T>(endpoint: Endpoint, queryParam: string): Observable<T> {
    return this.httpClient.delete(
      this.apiUrl + endpoint + queryParam
    ) as Observable<T>;
    // .pipe(catchError(error => this.handleError(error)));
  }

  // handleError(error: HttpErrorResponse)/*: Observable<any>*/ {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occured:', error.error.message);
  //   } else {
  //     return throwError({ error: error.message, status: error.status });
  //   }
  // }
}
