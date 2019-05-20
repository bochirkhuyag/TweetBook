import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  error: string;
  constructor( private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  form = new FormGroup({
    userName: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required])
  });

  login() {
    this.auth.login(this.form).subscribe(
      () => {
        this.router.navigate(["/"]);
      },
      err => {
        console.log("login error");
      }
    );
  }

}
