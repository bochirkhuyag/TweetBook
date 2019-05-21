import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Router} from "@angular/router";
import {CoreService} from "../core.service";
import { FileService } from 'src/app/services/file.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Object = {};
  stats:any;

  constructor(private authenticationService:AuthenticationService, private coreService: CoreService,
    private router: Router, private fileService:FileService, private cookieService:CookieService) { }

  ngOnInit() {

    const uid = this.cookieService.get('uid');
    this.authenticationService.getUserDetails(uid).subscribe(
      (response) =>{
         this.user = response;
      }
    );

    this.coreService.getStatsService(uid).subscribe(
      (response) =>{
        this.stats = response;
      }
    );
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  processFile(imageinput){

    const file: File = imageinput.files[0];
    const reader: FileReader = new FileReader();
    reader.addEventListener('load', (event:any)=>{
      this.fileService.uploadFile(file).subscribe(
        (res:any)=>{
          this.user = Object.assign({}, this.user, {picture:res.filePath});
        },
        (err)=>{console.log(err)}
      );
    });
    reader.readAsDataURL(file);
  }
}
