import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(``, Validators.required),
  });
  showPassword: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.showPassword = false;
  }

  async login() {
    const user: any = await this.authService.login(
      this.form.value.email!,
      this.form.value.password!
    );

    if (user) {
      let role = user.user._delegate.email.split('@', 1);
      localStorage.setItem('role', role);
      localStorage.setItem('token', user.user._delegate.accessToken);
      this.router.navigateByUrl('/dashboard');
    }
  }
}
