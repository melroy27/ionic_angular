import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  constructor(private authService: AuthService, private router: Router, private loadingCrtl: LoadingController) { }

  ngOnInit() {
  }
  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingCrtl.create({ // using loading controller
      keyboardClose: true, message: 'Loggin in....'
    }).then(loadinEl => {
      setTimeout(() => {
        this.isLoading = false;
        loadinEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    });
  }
  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLogin) {
      // send this req to login Server
    }
    else {
      // send the req to register/signup server
    }
  }
  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
