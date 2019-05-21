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
  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });
  constructor( private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }



  login() {
    this.auth.login(this.form).subscribe(
      (response) => {
        if(response.error) {
          this.error = response.error;
        } else {
          this.router.navigate(['/']);
        }
      },
      err => {
        this.error ="server error";
      }
    );
  }

}
