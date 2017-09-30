import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-homedetails',
  templateUrl: './homedetails.component.html',
  styleUrls: ['./homedetails.component.css']
})
export class HomedetailsComponent implements OnInit {
  homedetail : string[] = [];
  constructor(private http : HttpClient, private activatedrouter : ActivatedRoute) { }

  ngOnInit() {
    let token = localStorage.getItem("JWTtoken");
    let id : number;
    this.activatedrouter.params.subscribe((params: Params) => {
        id = params.id;
      });
    let getreq : string = "http://127.0.0.1:8000/api/houses/" + id + "/";
    this.http.get(getreq, {headers: new HttpHeaders().set('Authorization', "JWT " +token),
  }).subscribe( data => {
    for (let i in data){
      let temp : string = i + ": " + data[i];
      this.homedetail.push(temp);
    }
  });
  }

}
