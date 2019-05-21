import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {UserService} from "../../user/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-rightside',
  templateUrl: './rightside.component.html',
  styleUrls: ['./rightside.component.css']
})
export class RightSideComponent implements OnInit {

  user: Object={};
  suggestedSubscription: Subscription;
  userDetailsSubscription: Subscription;
  users: any [] ;


  constructor(private authenticationService: AuthenticationService, private cookieService:CookieService, private userService: UserService) { }

  ngOnInit() {
    const uid = this.cookieService.get('uid');

    this.userDetailsSubscription = this.authenticationService.getUserDetails(uid).subscribe(
      (response) =>{
         this.user = response;
      }
    );

    this.suggestedSubscription = this.userService.getSuggestedUsers(uid).subscribe(
      (users) => {
        this.users = users;
      }
    )
  }

  ngOnDestroy() {
    this.userDetailsSubscription.unsubscribe();
    this.suggestedSubscription.unsubscribe();
  }
}
