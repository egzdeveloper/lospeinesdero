import { Component, OnInit } from '@angular/core';
import { DatesService } from 'src/app/services/dates.service';

import { DateEvent } from 'src/app/models/date-event';
import { Router } from '@angular/router';

import * as moment from 'moment';
import { InventoryService } from 'src/app/services/inventory.service';
import { Article } from 'src/app/models/article';
import { ModalController } from '@ionic/angular';
import { InventoryModalComponent } from 'src/app/shared/inventory-modal/inventory-modal.component';
moment.locale('es');

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  today: string;
  tomorrow: string;
  yesterday: string;
  week: number;
  lastWeek: number;
  month: number;
  lastMonth: number;
  year: string;
  todayDates: DateEvent[] = [];
  tomorrowDates: DateEvent[] = [];
  todayTitle: string;
  tomorrowTitle: string;
  articles: Article[];
  dates: DateEvent[];

  billing = {
    today: 0,
    yesterday: 0,
    week: 0,
    lastWeek: 0,
    month: 0,
    lastMonth: 0,
    year: 0
  };

  constructor(
    private datesServices: DatesService,
    private router: Router,
    private inventorySvc: InventoryService,
    private modalCtrl: ModalController
  ) {
    this.today = moment().format('YYYY/MM/DD');
    this.tomorrow = moment().add(1, 'days').format('YYYY/MM/DD');
    this.yesterday = moment().subtract(1, 'days').format('YYYY/MM/DD');
    this.week = Number(moment().format('w'));
    this.lastWeek = this.week - 1;
    this.month = Number(moment().format('M'));
    this.lastMonth = this.month - 1;
    this.year = moment().format('YYYY');
    this.todayTitle = moment().format('ddd D [de] MMMM');
    this.tomorrowTitle = moment().add(1, 'days').format('ddd D [de] MMMM');
  }

  ngOnInit() {
    this.datesServices.getDates().subscribe((res) => {
      this.dates = res;

      this.todayDates = this.dates
        .filter((item) => {
          return item.day === this.today;
        })
        .sort((a, b) => {
          return a.startTime.toString().localeCompare(b.startTime.toString());
        });

      this.tomorrowDates = this.dates
        .filter((item) => {
          return item.day === this.tomorrow;
        })
        .sort((a, b) => {
          return a.startTime.toString().localeCompare(b.startTime.toString());
        });

      this.getBilling();
    });

    this.inventorySvc.getArticles().subscribe((res) => {
      this.articles = res.filter((item) => {
        return item['uds'] === 0;
      });
    });
  }

  formatDate(date: string): string {
    return date.substring(date.length - 5, date.length);
  }

  editDate(id: string, slidingItem?: any) {
    slidingItem.close(), this.router.navigateByUrl('/add/' + id);
  }

  async openModal(article?: Article) {
    const modal = await this.modalCtrl.create({
      component: InventoryModalComponent,
      componentProps: {
        article: article,
      },
    });
    modal.present();
  }

  getBilling() {
    const todayBilling = this.todayDates.reduce((total, item) => {
      return total + item.price;
    }, 0);

    const yesterdayBilling = this.dates.filter((item) => {
      return item.day === this.yesterday
    }).reduce((total, item) => {
      return total + item.price;
    }, 0);

    const weekBilling = this.dates.filter((item) => {
      return moment(item.day).format('w') === this.week.toString()
    }).reduce((total, item) => {
      return total + item.price;
    }, 0);

    const lastWeekBilling = this.dates.filter((item) => {
      return moment(item.day).format('w') === this.lastWeek.toString()
    }).reduce((total, item) => {
      return total + item.price;
    }, 0);

    const monthBilling = this.dates.filter((item) => {
      return moment(item.day).format('M') === this.month.toString()
    }).reduce((total, item) => {
      return total + item.price;
    }, 0);

    const lastMonthBilling = this.dates.filter((item) => {
      return moment(item.day).format('M') === this.lastMonth.toString()
    }).reduce((total, item) => {
      return total + item.price;
    }, 0);

    const yearBilling = this.dates.filter((item) => {
      return moment(item.day).format('YYYY') === this.year
    }).reduce((total, item) => {
      return total + item.price;
    }, 0);

    this.billing = {
      today: todayBilling,
      yesterday: yesterdayBilling,
      week: weekBilling,
      lastWeek: lastWeekBilling,
      month: monthBilling,
      lastMonth: lastMonthBilling,
      year: yearBilling
    };
  }
}
