import { Component, OnInit } from '@angular/core';
import {CoreService} from "../core.service";

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {

  posts: any[];

  constructor(private coreService: CoreService) { }

  ngOnInit() {
    console.log("sure");
    this.coreService.getPostsService()
      .subscribe(posts => {

        this.posts = posts;

      });
  }

}
