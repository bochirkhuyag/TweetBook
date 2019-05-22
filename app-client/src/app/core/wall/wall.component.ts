import { Component, OnInit } from '@angular/core';
import {CoreService} from "../core.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Tweet} from "../../models/post";
import {Comment} from "../../models/comment";
import {Message, MessageService} from "primeng/api";
import {Subscription} from "rxjs";
import {CookieService} from "angular2-cookie/core";
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  private postsSubscription: Subscription;

  userId: string;
  posts: any[];
  postCreateForm: FormGroup;
  commentForm: FormGroup;
  msgs: Message[] = [];
  user: any;
  selectedFile;

  constructor(private coreService: CoreService, private messageService: MessageService, private fileService:FileService, private cookieService: CookieService) { }

  ngOnInit() {

    this.postCreateForm = new FormGroup({
      content: new FormControl('', Validators.required)
    });
    this.commentForm = new FormGroup({
      comment: new FormControl('', Validators.required)
    });

    this.userId = this.cookieService.get('uid');
    this.user = JSON.parse(localStorage.user);
    this.getWallPosts();

  }

  onSubmit() {
    if (this.postCreateForm.valid) {

      const tweet = new Tweet();

      tweet.createdUser = {};

      tweet.id = null;
      tweet.content = this.postCreateForm.controls['content'].value;
      tweet.createdUser.user = this.userId;
      tweet.photo = this.selectedFile.url;

      // console.log(individual);
      this.coreService.savePostService(tweet).subscribe(
        data => console.log(data),
        error => {
          console.log('error');
          // this.msgs.push({severity: 'error', summary: error});
        },
        () => {
          this.getWallPosts();
          this.msgs = [];
          this.messageService.add({severity:'success', summary:'', detail:'Post success!'});
          this.postCreateForm.reset();
          this.selectedFile = Object.assign({}, this.selectedFile, {});
        }
      );
    }
  }

  ngOnDestroy() {
    this.postsSubscription.unsubscribe();
  }

  getWallPosts () {
    this.postsSubscription = this.coreService.getPostsService(this.userId)
      .subscribe(posts => {

        if (posts['success'] === false) {
          this.posts = [];
        } else {
          this.posts = posts;
        }

      });

    return this.postsSubscription;
  }

  addComment(id) {
    if (this.commentForm.valid) {

      const comment = new Comment();

      comment.id = null;
      comment.comment = this.commentForm.controls['comment'].value;
      comment.user = this.userId;
      comment.photo = this.selectedFile.url;

      // console.log(individual);
      this.coreService.addCommentService(id, comment).subscribe(
        data => console.log(data),
        error => {
          console.log('error');
          // this.msgs.push({severity: 'error', summary: error});
        },
        () => {
          this.getWallPosts();
          this.selectedFile = Object.assign({}, this.selectedFile, {});
          this.msgs = [];
          this.messageService.add({severity:'success', summary:'', detail:'Comment success!'});
          this.commentForm.reset();
        }
      );
    }
  }

  processFile(imageinput){

    const file: File = imageinput.files[0];
    const reader: FileReader = new FileReader();
    reader.addEventListener('load', (event:any)=>{
      this.fileService.uploadFilePost(file).subscribe(
        (res:any)=>{
          this.selectedFile = Object.assign({}, this.selectedFile, {src: event.target.result, url:res.filePath});
        },
        (err)=>{console.log(err)}
      );
    });
    reader.readAsDataURL(file);
  }

  likePost(id) {
    this.coreService.likePostService(id, this.userId).subscribe(
      data => console.log(data),
      error => {
        console.log('error');
        // this.msgs.push({severity: 'error', summary: error});
      },
      () => {
        this.getWallPosts();
        this.msgs = [];
        this.messageService.add({severity:'success', summary:'', detail:'Like success!'});
      }
    );
  }


}
