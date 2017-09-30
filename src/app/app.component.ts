import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { loggedin } from './global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loggedin : boolean = false
  username : string
  constructor(private auth : AuthService) {
  }

  ngOnInit(){
    this.auth.loggedChange.subscribe(data => {
      this.loggedin = data
      this.username = localStorage.getItem('username')
      console.log(this.loggedin)
    })
  }
}
