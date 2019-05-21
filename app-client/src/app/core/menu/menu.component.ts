import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {Router} from "@angular/router";
import {CoreService} from "../core.service";
import { HttpClient } from 'selenium-webdriver/http';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  user: Object;
  stats:any;

  constructor(private authenticationService:AuthenticationService, private coreService: CoreService,
    private router: Router, private fileService:FileService) { }

  ngOnInit() {
    this.user = Object.create({id:'5ce2ff4c50e4b95988b9dce1'});
    this.coreService.getStatsService().subscribe(
      (response) =>{
         this.stats = response;
      }
    );
    this.authenticationService.getUserDetails(this.user['id']).subscribe(
      (response) =>{
         this.user = response;
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
    reader.addEventListener('load', (event)=>{
      this.fileService.uploadFile(file).subscribe(
        (res)=>{console.log(res)},
        (err)=>{console.log(err)}
      );
      console.log("process file");
    });
    reader.readAsDataURL(file);
  }
}
