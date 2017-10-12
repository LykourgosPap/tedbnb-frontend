import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {
  public loggedin: boolean
  public loggedChange: Subject<boolean> = new Subject<boolean>()
  error: boolean = false
  showerror: any
  private BASE_URL: string = 'http://127.0.0.1:8000/rest-auth/login/';

  constructor(private http: HttpService, private router : Router) {
    this.loggedin = !(!localStorage.getItem('JWTtoken'))
    this.loggedChange.next(this.loggedin);
    console.log(this.loggedin)
  }

  login(credentials){
    this.http.Post(this.BASE_URL, credentials)
      .subscribe(
      res => {
        this.error = false
        localStorage.setItem('JWTtoken', res['token']);
        localStorage.setItem('username', res['user']['username']);
        this.setuser()
        this.router.navigateByUrl('/')
      },
      err => {
        this.error = true
        this.showerror = err;
      }
      );
    }

  logout(){
    this.logoutuser()
    localStorage.removeItem('JWTtoken')
    localStorage.removeItem('username')
  }

  setuser(){
    this.loggedChange.next(true)
  }

  logoutuser(){
    this.loggedChange.next(false)
  }
}
