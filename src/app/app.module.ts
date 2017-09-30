import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthService } from './services/auth/auth.service'
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomedetailsComponent } from './homedetails/homedetails.component';
import { HttpService } from './services/http/http.service';
import { AgmCoreModule } from '@agm/core';

const appRoutes = [
  { path:'register', component:RegisterComponent },
  { path: '', component:HomeComponent },
  { path: 'login', component:LoginComponent},
  { path: 'houses/:id', component: HomedetailsComponent },
  { path: '**', component: Page404Component },
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    Page404Component,
    HomeComponent,
    LoginComponent,
    HomedetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXmHogX74aw0eCqUVSkBnl0tOptXcjojQ',
      libraries: ['places']
    }),
    RouterModule.forRoot(
      appRoutes,
      {enableTracing:true}
  ),
    HttpClientModule,
  ],
  providers: [AuthService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
