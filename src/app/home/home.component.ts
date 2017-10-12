import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpService } from '../services/http/http.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

const now = new Date();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  zoom : number = 12;
  lat : number = 37.98100996893789;
  lng : number = 23.728408813476562;
  hoveredDate: NgbDateStruct;
  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;
  sForm: FormGroup;
  Alertmsg: string = "Please Specify persons"
  houses: Object
  p: number = 1;
  @ViewChild('search') public searchElement: ElementRef;

  constructor(calendar: NgbCalendar, private fb: FormBuilder, private http: HttpService, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {
    this.sForm = fb.group({
      'persons': [null, Validators.required],
    });
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }

  mapClicked($event:any){
    this.lat = $event.coords.lat;
    this.lng = $event.coords.lng;
  }

  Postit(post) {
    let fromDate: string;
    let toDate: string;
    if (this.fromDate.month < 10)
      fromDate = "" + this.fromDate.year + "-0" + this.fromDate.month + "-" + this.fromDate.day;
    else
      fromDate = "" + this.fromDate.year + "-" + this.fromDate.month + "-" + this.fromDate.day;
    if (this.toDate.month < 10)
      toDate = "" + this.toDate.year + "-0" + this.toDate.month + "-" + this.toDate.day;
    else
      toDate = "" + this.toDate.year + "-" + this.toDate.month + "-" + this.toDate.day;
    let getreq: string = "http://127.0.0.1:8000/api/rent?startdate='" + fromDate + "'&enddate='" + toDate + "'&persons=" + post.persons + "&lat=" + this.lat + "&lng=" + this.lng;
    this.http.Get(getreq).subscribe(data => {
      this.houses = data;
    });
  }

  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }


  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);

  onSubmit() {
    console.log(this.sForm.value);
  }

  ngOnInit() {
    this.mapsAPILoader.load().then(
        () => {
         let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types:["address"] });

          autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
           let place: google.maps.places.PlaceResult = autocomplete.getPlace();
           if(place.geometry === undefined || place.geometry === null ){
            return;
           }
           this.lat = place.geometry.location.lat();
           this.lng = place.geometry.location.lng();
           this.zoom = 15;
          });
          });
        }
           );
  }

}
