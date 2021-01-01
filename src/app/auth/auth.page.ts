import { Component, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService, private router: Router, private loadingCrtl: LoadingController) { }

  ngOnInit() {
  }
  onLogin() {
    this.isLoading = true;
    this.authService.login();
    this.loadingCrtl.create({
      keyboardClose: true, message: 'Loggin in....'
    }).then(loadinEl => {
      setTimeout(() => {
        this.isLoading = false;
        loadinEl.dismiss();
        this.router.navigateByUrl('/places/tabs/discover');
      }, 1500);
    });
  }
}
