import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private postsListUrl = '/api/upload';  // URL to web api

  constructor(private http: HttpClient) { }

  uploadFile(image:File): Observable<any[]>{

    let form = new FormData();
    form.append('image', image);
    return this.http.post<any>(this.postsListUrl + '/profile', form);

  }
//upload photo for tweet, comment
  uploadFilePost(image:File): Observable<any[]>{

    let form = new FormData();
    form.append('image', image);
    console.log("process file" + this.http);
    return this.http.post<any>(this.postsListUrl + '/post', form);

  }


}
