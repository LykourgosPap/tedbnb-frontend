import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpService } from '../services/http/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  passmatch: boolean = true;
  imageSrc

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.RegisterForm = fb.group({
      'username': [null, (Validators.required),],
      'email': [null, Validators.compose([Validators.required, Validators.email]),],
      'password': [null, Validators.required],
      'passwordr': [null, Validators.required],
      'first_name': [null, Validators.required],
      'last_name': [null, Validators.required],
      'About': [null,],
      'Type': [null, Validators.required],
    }
    );
  }

  ngOnInit() {
  }

  passwordValidator(pass: string, confpass: string): boolean {
    return (pass == confpass ? true : false);
  }

  attachFile(event) : void {
      var reader = new FileReader();
      let _self = this;

      reader.onload = function(e) {
        _self.imageSrc = reader.result;
      };
      reader.readAsDataURL(event.target.files[0]);
     }

  Postit(post) {
    let formvalid : boolean=true;
    for (let i in this.RegisterForm.controls){
      if (!this.RegisterForm.controls[i].valid)
        formvalid = false;
    }
    this.passmatch = this.passwordValidator(post.password, post.passwordr);
    if (!this.passmatch || !formvalid)
      return;
    let typeint : number;
    if (post.Type == 'Host')
      typeint = 2;
    else
      typeint = 1;
    const req = this.http.Post('http://127.0.0.1:8000/api/users/', {
      username: post.username,
      email: post.email,
      last_name: post.last_name,
      first_name: post.first_name,
      type: typeint,
      password: post.password,
    })
      .subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
      );
  }
}
