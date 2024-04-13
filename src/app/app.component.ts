import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isLogged: boolean;

  constructor(
    platform: Platform,
    private authService: AuthService,
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
    });
  }

  ngOnInit() {
    this.authService.getActualUser().subscribe((res) => {
      if (!res) {
        localStorage.clear();
      }
    });
  }

  showSidebar(): boolean {
    if (localStorage.getItem('token')) return true;
    return false;
  }
}
