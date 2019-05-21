import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-rightside',
  templateUrl: './rightside.component.html',
  styleUrls: ['./rightside.component.css']
})
export class RightSideComponent implements OnInit {

  user: Object={};
  constructor(private authenticationService: AuthenticationService, private cookieService:CookieService) { }

  ngOnInit() {
    const uid = this.cookieService.get('uid');

    this.authenticationService.getUserDetails(uid).subscribe(
      (response) =>{
         this.user = response;
      }
    )
  }
}
