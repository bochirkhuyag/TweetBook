import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { CookieService } from 'angular2-cookie/services/cookies.service';


// export interface UserDetails{
//   id:string
// }

export interface CredentialPayload{
  email:string
}

interface TokenResponse {
  token:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService{

  constructor(private http: HttpClient, private router: Router, private cookieService: CookieService){}
  setToken(token: string){
    localStorage.setItem('token', token);
  }
  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
  }

  getUserDetails(uid: string): Observable<any[]> {
    const client = this.http.get<any[]>('/api/users/' + uid);
    return client;
  }

  public register(user: FormGroup): Observable<any>{
    return this.registerOrLogin(user, '/api/auth/register');
  }

  public login(user: FormGroup): Observable<any>{
    return this.registerOrLogin(user, '/api/auth/login');
  }

  private registerOrLogin(user: FormGroup, url: string): Observable<any>{
    const client = this.http.post(url, user.value);
    const request = client.pipe(
      map((data: any) =>{
        //TokenResponse
        if (data.token) {
          this.setToken(data.token);
          this.cookieService.put('uid', data.user._id);
          localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
      })
    )
    return request;
  }
}

