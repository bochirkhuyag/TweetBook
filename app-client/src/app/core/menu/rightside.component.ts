import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-rightside',
  templateUrl: './rightside.component.html',
  styleUrls: ['./rightside.component.css']
})
export class RightSideComponent implements OnInit {

  user: Object;
  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.user = Object.create({id:'5ce2ff4c50e4b95988b9dce1'});

    this.authenticationService.getUserDetails(this.user['id']).subscribe(
      (response) =>{
         this.user = response;
      }
    )
  }
}
