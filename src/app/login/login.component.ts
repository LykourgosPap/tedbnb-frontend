import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  
  constructor(private fb: FormBuilder, private http: HttpClient, private auth: AuthService, private router: Router) {
    this.LoginForm = fb.group({
      'username': [null, (Validators.required),],
      'password': [null, Validators.required],
    }
    );
  }

  ngOnInit() {
  }



  Login(post) {
    let formvalid: boolean = true;
    for (let i in this.LoginForm.controls) {
      if (!this.LoginForm.controls[i].valid)
        formvalid = false;
    }
    if (!formvalid)
      return;
    let credentials = {
      username: post.username,
      password: post.password
    }
    this.auth.login(credentials)
  }
}
