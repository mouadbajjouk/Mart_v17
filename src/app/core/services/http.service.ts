import { Endpoint } from './../enums/endpoint';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root', //singleton
})
export class HttpService {
  httpClient = inject(HttpClient);

  get<T>(endpoint: Endpoint, options?: any): Observable<T> {
    return this.httpClient.get<T>(
      'https://localhost:5001/api' + endpoint,
      options
    ) as Observable<T>;
  }

  post<T>(endpoint: Endpoint, data: any, options?: any): Observable<T> {
    return this.httpClient.post<T>(
      'https://localhost:5001/api' + endpoint,
      data,
      options
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
