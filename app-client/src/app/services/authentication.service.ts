import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import { FormGroup } from '@angular/forms';


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

  constructor(private http: HttpClient, private router: Router){}
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
    const client = this.http.get('/api/users/' + uid);

    const request = client.pipe(
      map((data: any) =>{
        console.log(data);
        return data;
      })
    );
    return request;
  }

  public register(user: FormGroup): Observable<any>{
    return this.registerOrLogin(user, '/api/users/register');
  }

  public login(user: FormGroup): Observable<any>{
    return this.registerOrLogin(user, '/api/users/login');
  }

  private registerOrLogin(user: FormGroup, url: string): Observable<any>{
    const client = this.http.post(url, user.value);
    const request = client.pipe(
      map((data: TokenResponse) =>{
        if (data.token) {
          this.setToken(data.token);
        }
        return data;
      })
    )
    return request;
  }
}

