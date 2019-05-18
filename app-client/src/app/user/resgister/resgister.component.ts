import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-resgister',
  templateUrl: './resgister.component.html',
  styleUrls: ['./resgister.component.css']
})
export class ResgisterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  registerForm = new FormGroup({
    username:new FormControl(),
    email:new FormControl(), 
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required])
  })

}
