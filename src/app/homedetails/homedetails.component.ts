import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http'

@Component({
  selector: 'app-homedetails',
  templateUrl: './homedetails.component.html',
  styleUrls: ['./homedetails.component.css']
})
export class HomedetailsComponent implements OnInit {
  homedetail: string[] = [];
  error: boolean = false
  showerror : any
  constructor(private http: HttpService, private activatedrouter: ActivatedRoute) { }

  ngOnInit() {
    let id: number;
    this.activatedrouter.params.subscribe((params: Params) => {
      id = params.id;
    });
    let getreq: string = "http://127.0.0.1:8000/api/houses/" + id + "/";
    this.http.get(getreq, true).subscribe(
      data => {
        for (let i in data)
          this.homedetail.push(data[i])
      },
      (err: HttpErrorResponse) => {
        this.error = true
        this.showerror = err
      }
    );


  }
}
