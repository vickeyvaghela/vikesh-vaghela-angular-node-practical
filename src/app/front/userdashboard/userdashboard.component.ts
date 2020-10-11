import { Component, OnInit } from '@angular/core';

import {UserService} from './../user.service'

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private userServ: UserService) { }

  ngOnInit(): void {

    console.log("giklll")

    this.userServ.login({
      email:"john@doe.com",
      password:"12345"
    }).subscribe(loginRes => {

      console.log("viviviviv galla")

      console.log(loginRes)

    },error => {
      console.log('err')
      console.log(error);
    });

  }

}
