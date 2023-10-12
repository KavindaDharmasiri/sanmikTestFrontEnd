import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpService} from '../../../utils/http-service';
import {map} from 'rxjs/operators';
import {UserModule} from '../modules/user/user.module';
import {HttpBackend, HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any> {
    return this.http.get(HttpService.SERVICE_PATH + 'users/getAllUsers')
      .pipe(map(response => response as any));
  }

  postUser(user: UserModule): Observable<any> {
    return this.http.post(HttpService.SERVICE_PATH + 'users/saveUser', user)
      .pipe(map(response => response as any));
  }

  deleteUser(user) {
    return this.http.delete(HttpService.SERVICE_PATH + 'users/deleteUser?id='+user ).
    pipe(map(response => response as any));
  }
}
