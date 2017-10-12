import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  messages = []
  constructor(private http : HttpService) { }

  ngOnInit() {
    let req = "this.messages"
    this.http.Get(req)
  }

}
