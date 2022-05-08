import { Component, OnInit } from '@angular/core';
import { UserCredential } from 'firebase/auth';
import { User } from './../../shared/models/User';
import { Location } from '@angular/common';
import {  ComponentFactoryResolver, } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fire from '@angular/fire/auth/firebase';
import firebase from "firebase/compat/app";
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { FirebaseError } from 'firebase/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-job-creating',
  templateUrl: './job-creating.component.html',
  styleUrls: ['./job-creating.component.scss']
})
export class JobCreatingComponent implements OnInit {
  signUpForm = new FormGroup({
    salary: new FormControl(0),
    tasks: new FormControl(''),
    jobName: new FormControl(''),
  });


  constructor(
    private snackBar: MatSnackBar,
    private location: Location, private authService: AuthService, private userService: UserService) { }


  ngOnInit(): void {
  }



  onSubmit(){

  }
}
