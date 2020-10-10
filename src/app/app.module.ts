import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserdashboardComponent } from './front/userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { UserloginComponent } from './front/userlogin/userlogin.component';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { UserregistrationComponent } from './front/userregistration/userregistration.component';

@NgModule({
  declarations: [
    AppComponent,
    UserdashboardComponent,
    AdmindashboardComponent,
    UserloginComponent,
    AdminloginComponent,
    UserregistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
