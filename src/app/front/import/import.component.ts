import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup} from '@angular/forms';

import {UserService} from './../user.service'


@Component({
  selector: 'app-import',
  templateUrl: './import.component.html',
  styleUrls: ['./import.component.css']
})
export class ImportComponent implements OnInit {

  myProfileForm: FormGroup;

  constructor(private userServ: UserService) { }

  ngOnInit(): void {
    this.myProfileForm = new FormGroup({})
  }

  onSubmit(){
    console.log("on submit fun")

    let formData:FormData = new FormData();
    formData.append('profilePic', this.profilePicBlob, this.profilePicBlob.name)


    this.userServ.uploadImages(formData).subscribe(uploadImageRes => {



    },error => {
      console.log(error);
    });
  }

  validProfilePic = true;
  validProfilePicName = null;
  profilePicBlob: File = null;
  profilePicExt: String = null;

  profilePicChanged(event) {

    let fileList: FileList = event.target.files;
    if(fileList.length > 0) {

      let ProfilePicExt = fileList[0].name.split('.').pop().toUpperCase();

      this.profilePicExt = ProfilePicExt;

      if(ProfilePicExt=='CSV' || ProfilePicExt=='JSON' || ProfilePicExt=='PNG'){
        this.validProfilePic = true;
        this.validProfilePicName = fileList[0].name;
        this.profilePicBlob = fileList[0];





      }else{
        alert('invalid file')
      }
    }
  }

}
