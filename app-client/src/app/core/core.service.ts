import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private postsList = '/api/tweets';  // URL to web api

  constructor(private http: HttpClient) { }

  public posts;

  // Хувь хүний жагсаалт авах
  getPostsService(): Observable<any[]> {
    this.posts = this.http.get<any[]>(this.postsList);
    return this.posts;
  }
}
