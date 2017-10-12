import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class HttpService {
  response: any
  error: HttpErrorResponse
  constructor(private http: HttpClient) { }


  public Post(req, body) {
    if (localStorage.getItem('JWTtoken'))
      return this.post(req, body, true)
    else
      return this.post(req, body)
  }

  private post(req: string, body: string, auth: boolean = false) {
    if (auth) {
      let token = localStorage.getItem('JWTtoken')
      return this.http.post(req, body, { headers: new HttpHeaders().set('Authorization', "JWT " + token) })
    }

    else {
      return this.http.post(req, body)
    }
  }

  public Get(req) {
    if (localStorage.getItem('JWTtoken'))
      return this.get(req, true)
    else
      return this.get(req)
  }
  private get(req: string, auth: boolean = false) {

    if (auth) {
      let token = localStorage.getItem('JWTtoken')
      return this.http.get(req, { headers: new HttpHeaders().set('Authorization', "JWT " + token) })
    }

    else {
      return this.http.get(req)
    }
  }

  public Put(req, body){
    if (localStorage.getItem('JWTtoken'))
      return this.post(req, body, true)
    else
      return this.post(req, body)
  }

  private put(req: string, body: string, auth: boolean = false) {
    if (auth) {
      let token = localStorage.getItem('JWTtoken')
      return this.http.put(req, body, { headers: new HttpHeaders().set('Authorization', "JWT " + token) })
    }

    else {
      return this.http.put(req, body)
    }
  }

  verifytoken(): boolean{
    let url = 'http://127.0.0.1:8000/api-token-verify/'
    let token = localStorage.getItem('JWTtoken')
    let verified
    let body = {
      Token: token,
    }
    this.post(url, token).subscribe( res => {
      verified = true
    },
    (err => {
      verified = false
    }));

    return verified;
  }
}
