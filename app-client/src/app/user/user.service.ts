import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private suggestedUserListUrl = '/api/users/suggested/';

  constructor(private http: HttpClient) { }

  getSuggestedUsers(id): Observable<any[]> {
    return this.http.get<any[]>(this.suggestedUserListUrl + id);
  }
}
