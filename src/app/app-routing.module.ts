import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { UserloginComponent } from './front/userlogin/userlogin.component';
import { UserdashboardComponent } from './front/userdashboard/userdashboard.component';
import { ImportComponent } from './front/import/import.component';


const routes: Routes = [
  { path: '', component: UserdashboardComponent },
  { path: 'user-login', component: UserloginComponent },
  { path: 'user-dashboard', component: UserdashboardComponent },
  { path: 'import', component: ImportComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
