import { Component, OnInit } from '@angular/core';
import { UserModule } from 'src/app/user/user.module';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user;

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getUser(this.user.id).subscribe(
      (response) =>{
        console.log(response);
      }
    )
  }

}
