import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  pForm : FormGroup
  imageSrc : any
  constructor( private fb: FormBuilder, private http : HttpService) {
    this.pForm = fb.group({
      'email': [null, Validators.required],
      'username': [null, Validators.required],
      'firstname': [null, Validators.required],
      'lastname': [null, Validators.required],
      'type': [null, Validators.required],
      'about': [null, Validators.required],
      'avatar': [null, Validators.required],
    });
   }

  ngOnInit() {

  }

Update(form){
  let body = {
    email: form.email,
    username: form.username,
    firstname: form.firstname,
    type: form.type,
    about: form.about,
    photo: form.avatar,
  }
  this.http.Put('http://127.0.0.1:8000/api/users/', body).subscribe( res => console.log(res))
}

attachFile(event) : void {
    var reader = new FileReader();
    let _self = this;

    reader.onload = function(e) {
      _self.imageSrc = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
   }
}
