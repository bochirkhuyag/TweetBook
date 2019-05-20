import { Injectable } from '@angular/core';
import {CanActivate, Router} from "@angular/router";
import {AuthenticationService} from "./authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AppGuardService implements CanActivate{

  constructor(public router: Router, public authenticationService: AuthenticationService) { }

  canActivate(): boolean {
    //Authentication logic here
    if (this.authenticationService.getToken() == null) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
