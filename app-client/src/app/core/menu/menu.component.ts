import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Router} from "@angular/router";
import {CoreService} from "../core.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Object;
  stats:any;
  constructor(private authenticationService:AuthenticationService, private coreService: CoreService, private router: Router) { }

  ngOnInit() {
    this.user = Object.create({id:'5ce2ff4c50e4b95988b9dce1'});

    this.authenticationService.getUserDetails(this.user['id']).subscribe(
      (response) =>{
         this.user = response;
      }
    )

    this.coreService.getStatsService().subscribe(
      (response) =>{
        console.log("fdsfd" + response);
         this.stats = response;
      }
    )
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
