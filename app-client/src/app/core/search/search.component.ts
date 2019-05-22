import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user/user.service";
import {CoreService} from "../core.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  results: any [];
  query: string;

  constructor(private userService: UserService, private coreService: CoreService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.query = params.query;
      console.log(this.query);
    });
  }

  ngOnDestroy() {

  }

}
