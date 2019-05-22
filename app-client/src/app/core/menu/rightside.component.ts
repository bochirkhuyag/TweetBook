import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import {UserService} from "../../user/user.service";
import {Subscription} from "rxjs";
import {MessageService} from "primeng/api";
import {WallComponent} from "../wall/wall.component";

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
  userId: string;

  constructor(private authenticationService: AuthenticationService, private cookieService:CookieService, private userService: UserService, private messageService: MessageService, private wallComponent: WallComponent) { }

  ngOnInit() {
    const uid = this.cookieService.get('uid');
    this.userId = uid;
    this.userDetailsSubscription = this.authenticationService.getUserDetails(uid).subscribe(
      (response) =>{
         this.user = response;
      }
    );

    this.getSuggestedUsers();

  }

  ngOnDestroy() {
    this.userDetailsSubscription.unsubscribe();
    this.suggestedSubscription.unsubscribe();
  }

  getSuggestedUsers() {
    this.suggestedSubscription = this.userService.getSuggestedUsers(this.userId).subscribe(
      (users) => {
        this.users = users;
      }
    )
  }

  followUser(id) {
    this.userService.followUserService(id, this.userId).subscribe(
      data => console.log(data),
      error => {
        console.log('error');
        // this.msgs.push({severity: 'error', summary: error});
      },
      () => {
        this.getSuggestedUsers();
        this.wallComponent.getWallPosts();
        this.messageService.add({severity:'success', summary:'', detail:'Follow success!'});
      }
    );
  }

  unfollowUser(id) {
    this.userService.unfollowUserService(id, this.userId).subscribe(
      data => console.log(data),
      error => {
        console.log('error');
        // this.msgs.push({severity: 'error', summary: error});
      },
      () => {
        this.getSuggestedUsers();
        this.wallComponent.getWallPosts();
        this.messageService.add({severity:'success', summary:'', detail:'Follow success!'});
      }
    );
  }
}
