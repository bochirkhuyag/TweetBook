import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Tweet} from "../models/post";
import {Comment} from "../models/comment";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private postsListUrl = '/api/tweets';  // URL to web api
  private selfPostsListUrl = '/api/tweets/self/';  // URL to web api

  constructor(private http: HttpClient) { }

  public posts;
  public selfPosts;


  getStatsService(): Observable<any[]> {
    return this.http.get<any[]>(this.postsListUrl + '/5ce1b529d20f444cb8eb1061/stats');
  }

  getPostsService(): Observable<any[]> {
    this.posts = this.http.get<any[]>(this.postsListUrl);
    return this.posts;
  }

  getSelfPostsService(id): Observable<any[]> {
    this.selfPosts = this.http.get<any[]>(this.selfPostsListUrl + id);
    return this.selfPosts;
  }

  savePostService(tweet: Tweet): Observable<any> {
    return this.http.post(this.postsListUrl, tweet)
      .pipe(catchError((error: any) => throwError(error.json().error || 'Server error')))
  }

  addCommentService(id, comment: Comment) : Observable<any> {
    console.log(id);
    return this.http.put(this.postsListUrl + "/" + id + "/comment", comment)
      .pipe(catchError((error: any) => throwError(error.json().error || 'Server error')))
  }
}
