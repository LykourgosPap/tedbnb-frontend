import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

@Injectable()
export class HttpService {
  response: any
  error: HttpErrorResponse
  constructor(private http: HttpClient) { }

  post(req: string, body: string, auth: boolean = false) {
    if (auth) {
      let token = localStorage.getItem('JWTtoken')
      return this.http.post(req, body, { headers: new HttpHeaders().set('Authorization', "JWT " + token) })
    }

    else {
      return this.http.post(req, body)
  }
}

  get(req: string, auth: boolean = false) {

    if (auth) {
      let token = localStorage.getItem('JWTtoken')
      return this.http.get(req, { headers: new HttpHeaders().set('Authorization', "JWT " + token) })
    }

    else {
      return this.http.get(req)
    }
  }

}
