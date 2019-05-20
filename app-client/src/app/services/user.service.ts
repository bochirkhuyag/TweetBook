import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private postsList = '/api/users';  // URL to web api

  constructor(private http: HttpClient) { }

  public posts;

  getUser(uid: string): Observable<any[]> {

    const client = this.http.get('/api/users/' + uid);

    const request = client.pipe(
      map((data: any) =>{
        console.log(data);
        return data;
      })
    );
    return request;
  }
}
