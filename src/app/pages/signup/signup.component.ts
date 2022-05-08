import { UserCredential } from 'firebase/auth';
import { User } from './../../shared/models/User';
import { Location } from '@angular/common';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as fire from '@angular/fire/auth/firebase';
import firebase from "firebase/compat/app";
import { prepareSyntheticListenerFunctionName } from '@angular/compiler/src/render3/util';
import { FirebaseError } from 'firebase/app';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl(''),
    name: new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl('')
    })
  });


  constructor(
    private snackBar: MatSnackBar,
    private location: Location, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    console.log(this.signUpForm.value);
    let cred : firebase.auth.UserCredential|null;

    try{
      // Felhasználó létrehozása
      cred = await this.authService.signup(this.signUpForm.get('email')?.value, this.signUpForm.get('password')?.value);
    }catch(e){
      if(e instanceof FirebaseError){
        switch(e.code){
          case "auth/invalid-email":{
            this.snackBar.open("Érvénytelen e-mail cím","Bezár");
            break;
          }
          case "auth/weak-password":{
            this.snackBar.open("Gyenge jelszó, min 6 karakter","Bezár");
            break;
          }
          case "auth/email-already-in-use":{
            this.snackBar.open("Az e-mail cím foglalt", "Bezár")
            
            break;
          }
          default:{
            this.snackBar.open(`Hiba történt ${e.message}`,'Bezár');
          }
        }
      }else{
        this.snackBar.open("Ismeretlen hiba történt","Bezár");
      }
      return;
    }

    const user: User = {
      id: cred!.user?.uid as string,
      email: this.signUpForm.get('email')?.value,
      username: this.signUpForm.get('email')?.value.split('@')[0],
      name: {
        firstname: this.signUpForm.get('name.firstname')?.value,
        lastname: this.signUpForm.get('name.lastname')?.value
      }
    };
    
    try{
      await this.userService.create(user);
    }catch(e){
      console.log(e);
      this.snackBar.open(`Hiba történt: ${e}`,"Bezár");
      return;
    }
      
    this.snackBar.open('Sikeres regisztráció!',"Vettem!");
  }

  goBack() {
    this.location.back();
  }

}
