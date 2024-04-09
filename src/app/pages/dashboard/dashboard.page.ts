import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/services/dates.service';

import { Date } from 'src/app/models/date';
import { Router } from '@angular/router';

import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  today: string;
  tomorrow: string;
  todayDates: Date[] = [];
  tomorrowDates: Date[] = [];
  todayTitle: string;
  tomorrowTitle: string;

  constructor(private datesServices: DatesService, private router: Router) {
    this.today = moment().format('YYYY/MM/DD')
    this.tomorrow = moment().add(1, 'days').format('YYYY/MM/DD');
    this.todayTitle = moment().format('ddd D [de] MMMM');
    this.tomorrowTitle = moment().add(1, 'days').format('ddd D [de] MMMM');
  }

  ngOnInit() {
    this.datesServices.getDateByDay(this.today).subscribe(res => {
      this.todayDates = res;
    });
    this.datesServices.getDateByDay(this.tomorrow).subscribe(res => {
      this.tomorrowDates = res;
    });
  }

  formatDate(date: string): string {
    return date.substring(date.length - 5, date.length);
  }

  editDate(id: string) {
    this.router.navigateByUrl('add/' + id);
  }
}
