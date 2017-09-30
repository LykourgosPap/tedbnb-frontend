import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class AuthService {
  loggedin: boolean = false
  loggedChange: Subject<boolean> = new Subject<boolean>()
  error: boolean = false
  showerror: any
  private BASE_URL: string = 'http://127.0.0.1:8000/rest-auth/login/';

  constructor(private http: HttpService, private router : Router) {
    this.loggedChange.subscribe( data => this.loggedin = data)
  }

  login(credentials){
    this.http.post(this.BASE_URL, credentials)
      .subscribe(
      res => {
        this.error = false
        localStorage.setItem('JWTtoken', res['token']);
        localStorage.setItem('username', res['user']['username']);
        this.loggedChange.next(true);
        this.router.navigateByUrl('/')
      },
      err => {
        this.error = true
        this.showerror = err;
      }
      );
    }

  logout(){
    this.loggedChange.next(false);
    localStorage.removeItem('JWTtoken')
    localStorage.removeItem('username')
  }
}
