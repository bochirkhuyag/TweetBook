import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Tweet} from "../models/post";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private postsListUrl = '/api/tweets';  // URL to web api

  constructor(private http: HttpClient) { }

  public posts;

  getPostsService(): Observable<any[]> {
    this.posts = this.http.get<any[]>(this.postsListUrl);
    return this.posts;
  }

  savePostService(tweet: Tweet): Observable<any> {
    return this.http.post(this.postsListUrl, tweet)
      .pipe(catchError((error: any) => Observable.throw(error.json().error || 'Server error')))
  }
}
