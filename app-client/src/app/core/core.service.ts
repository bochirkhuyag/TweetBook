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
  private wallPostsListUrl = '/api/tweets/user/';
  private searchUsersUrl = '/api/users/search/';

  constructor(private http: HttpClient) { }

  public posts;
  public selfPosts;

  getStatsService(id): Observable<any[]> {
    return this.http.get<any[]>(this.postsListUrl + '/' + id + '/stats');
  }

  getPostsService(id): Observable<any[]> {
    this.posts = this.http.get<any[]>(this.wallPostsListUrl + id);
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
    return this.http.put(this.postsListUrl + "/" + id + "/comment", comment)
      .pipe(catchError((error: any) => throwError(error.json().error || 'Server error')))
  }

  likePostService(id, userId) : Observable<any> {
    return this.http.put(this.postsListUrl + "/" + id + "/like", {'user': userId})
      .pipe(catchError((error: any) => throwError(error.json().error || 'Server error')))
  }

  deleteTweet(id) : Observable<any> {
    return this.http.delete(this.postsListUrl + "/" + id)
      .pipe(catchError((error: any) => throwError( error.json().error || 'Server error')))
  }

  retweetPostService(tweet: Tweet) : Observable<any> {
    return this.http.put(this.postsListUrl, tweet)
      .pipe(catchError((error: any) => throwError(error.json().error || 'Server error')))
  }

  searchUserService(query) : Observable<any> {
    return this.http.get<any[]>(this.searchUsersUrl + query);
  }
}
