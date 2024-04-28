import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { RangeCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  constructor() {

  }

  changeScale(ev: Event) {
    if ((ev as RangeCustomEvent).detail.value === 1) {
      document.documentElement.style.fontSize = "0.7rem";
    }
  }
}
