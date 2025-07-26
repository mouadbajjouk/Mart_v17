import { inject, Injectable } from '@angular/core';
import { HttpService } from '../core/services/http.service';
import { Observable } from 'rxjs';
import { Endpoint } from '../core/enums/endpoint';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  httpService = inject(HttpService);

  deleteFile(fileId: string): Observable<boolean> {
    // fileId logged for debugging

    return this.httpService.deleteUsingQuery<boolean>(
      Endpoint.DELETE_FILE,
      '/' + fileId
    );
  }
}
