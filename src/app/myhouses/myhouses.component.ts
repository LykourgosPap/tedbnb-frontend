import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service'
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-myhouses',
  templateUrl: './myhouses.component.html',
  styleUrls: ['./myhouses.component.css']
})
export class MyhousesComponent implements OnInit {
  houses: Object
  constructor(private http : HttpService) { }

  ngOnInit() {
    let username = localStorage.getItem('username')
    let req = 'http://127.0.0.1:8000/api/houses?user=' +username;
    this.http.Get(req).subscribe(res => this.houses = res)
  }

}
