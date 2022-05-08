import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { FakeLoadingService } from '../../shared/services/fake-loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  email = new FormControl('');
  password = new FormControl('');

  loadingSubscription?: Subscription;
  loadingObservation?: Observable<boolean>;

  loading: boolean = false;

  constructor(private snackBar: MatSnackBar,private router: Router, private loadingService: FakeLoadingService, public authService: AuthService) { }
  
  ngOnInit(): void {
    this.authService.isUserLoggedIn().subscribe(user => {
      if(user){
        this.router.navigateByUrl("/main");
      }
    }, error => {
      console.error(error);
      localStorage.setItem('user', JSON.stringify('null'));
    });
  }


  async login() {
    this.loading = true;

    this.authService.login(this.email.value, this.password.value).then(cred => {
      console.log(cred);
      this.router.navigateByUrl('/main');
      this.loading = false;
    }).catch(error => {
      console.error(error);
      this.snackBar.open(`Hiba történt: ${error}`,"Bezár");
      this.loading = false;
    });
  }

  ngOnDestroy() {
    this.loadingSubscription?.unsubscribe();
  }

}
