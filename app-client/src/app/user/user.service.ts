import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl = '/api/users/';
  private suggestedUserListUrl = '/api/users/suggested/';

  constructor(private http: HttpClient) { }

  getSuggestedUsers(id): Observable<any[]> {
    return this.http.get<any[]>(this.suggestedUserListUrl + id);
  }

  followUserService(id , userId) : Observable<any> {
    return this.http.post(this.usersUrl + userId + '/follow', {'user': id})
      .pipe(catchError((error: any) => throwError(error.json || 'Server error occured')));
  }
}
