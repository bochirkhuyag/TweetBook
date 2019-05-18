import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppGuardService {

  constructor(public router: Router) { }

  canActivate(): boolean {
    //Authentication logic here
    return true;
  }
}
