





import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';


import {UserService} from './../user.service'


@Component({
  selector: 'app-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent  {
  loginForm: FormGroup;
  constructor(private userServ: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSubmit() {
    if(this.loginForm.valid) {




      this.userServ.login({email:this.loginForm.value.email,password:this.loginForm.value.password}).subscribe(userServRes => {

        if(userServRes.success){
          localStorage.setItem("email",this.loginForm.value.email)
          window.location.href = "/user-dashboard";

        }else{
          alert("Invali id or password")
        }
        console.log("taskerrss ",userServRes)

      },error => {
        console.log(error);
      });




      //console.log(this._v());
    }
  }
  _v() {
    return this.loginForm.value;
  }
}

