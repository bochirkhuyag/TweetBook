import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {CoreService} from "../core.service";
import {Subscription} from "rxjs";
import {CookieService} from "angular2-cookie/core";
import {Tweet} from "../../models/post";
import {Comment} from "../../models/comment";
import {UserService} from "../../user/user.service";
import {ActivatedRoute} from "@angular/router";
import {MenuComponent} from "../menu/menu.component";
import {RightSideComponent} from "../menu/rightside.component";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private postsSubscription: Subscription;
  private usersSubscription: Subscription;

  posts: any[];
  postCreateForm: FormGroup;
  user: any;
  curUser: any;
  userId: any;
  commentForm: FormGroup;
  profile: any;

  users: any[];
  followers: any[];
  isFollowing: boolean;

  constructor(
    private coreService: CoreService,
    private messageService: MessageService,
    private cookieService: CookieService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private userService: UserService,
    private rightSideComponent: RightSideComponent,
    private authenticationService: AuthenticationService
  ) {
    this.route.params.subscribe
    (
      params => {
        this.userId = params['id'];
        this.getProfilePosts();
        this.getUserFollowers(this.userId);
        console.log(this.userId);
      }
    );
  }

  ngOnInit() {
    console.log("route changing");
    this.postCreateForm = new FormGroup({
      content: new FormControl('', Validators.required)
    });

    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });

    this.user = JSON.parse(localStorage.user);

    // this.getProfilePosts();
    // this.getUserFollowers(this.userId);
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }

  getProfilePosts () {
    this.postsSubscription = this.coreService.getSelfPostsService(this.userId)
      .subscribe(posts => {

        this.posts = posts;
      });
    return this.postsSubscription;
  }

  onSubmit() {
    if (this.postCreateForm.valid) {

      const tweet = new Tweet();

      tweet.createdUser = {};

      tweet.id = null;
      tweet.content = this.postCreateForm.controls['content'].value;
      tweet.createdUser.user = this.userId;

      // console.log(individual);
      this.coreService.savePostService(tweet).subscribe(
        data => console.log(data),
        error => {
          console.log('error');
          // this.msgs.push({severity: 'error', summary: error});
        },
        () => {
          this.getProfilePosts();
          this.messageService.add({severity:'success', summary:'', detail:'Post success!'});
          this.postCreateForm.reset();
        }
      );
    }
  }

  addComment(id) {
    if (this.commentForm.valid) {

      const comment = new Comment();

      comment.id = null;
      comment.comment = this.commentForm.controls['comment'].value;
      comment.user = this.userId;

      // console.log(individual);
      this.coreService.addCommentService(id, comment).subscribe(
        data => console.log(data),
        error => {
          console.log('error');
          // this.msgs.push({severity: 'error', summary: error});
        },
        () => {
          this.getProfilePosts();
          this.messageService.add({severity:'success', summary:'', detail:'Comment success!'});
          this.commentForm.reset();
        }
      );
    }
  }

  likePost(id) {
    this.coreService.likePostService(id, this.userId).subscribe(
      data => console.log(data),
      error => {
        console.log('error');
        // this.msgs.push({severity: 'error', summary: error});
      },
      () => {
        this.getProfilePosts();
        this.messageService.add({severity:'success', summary:'', detail:'Like success!'});
      }
    );
  }

  getUserFollowers(id) {
    this.usersSubscription = this.userService.getUserByIdService(id)
      .subscribe(user => {
        this.profile = user;
      });

    return this.usersSubscription;
  }

  followUser(id) {
    this.userService.followUserService(id, this.userId).subscribe(
      data => console.log(data),
      error => {
        console.log('error');
        // this.msgs.push({severity: 'error', summary: error});
      },
      () => {
        this.getUserFollowers(this.userId);
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
        this.getUserFollowers(this.userId);
        this.messageService.add({severity:'success', summary:'', detail:'Follow success!'});
      }
    );
  }
}
