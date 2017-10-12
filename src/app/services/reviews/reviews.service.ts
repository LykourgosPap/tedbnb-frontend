import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service'

@Injectable()
export class ReviewsService {

  constructor( private http : HttpService) { }

getreviews(house){
  let req = 'http://127.0.0.1:8000/api/reviews?house=' + house;
  return this.http.Get(req)
}
}
