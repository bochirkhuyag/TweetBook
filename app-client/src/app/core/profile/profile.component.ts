import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Message, MessageService} from "primeng/api";
import {CoreService} from "../core.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private postsSubscription: Subscription;

  posts: any[];
  postCreateForm: FormGroup;
  user: any;

  constructor(private coreService: CoreService, private messageService: MessageService) { }

  ngOnInit() {
    this.postCreateForm = new FormGroup({
      content: new FormControl('', Validators.required)
    });

    this.user = JSON.parse(localStorage.user);
    this.getProfilePosts();
  }

  getProfilePosts () {
    this.postsSubscription = this.coreService.getSelfPostsService(this.user._id)
      .subscribe(posts => {

        this.posts = posts;
        console.log(this.posts);

      });
    return this.postsSubscription;
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

}
