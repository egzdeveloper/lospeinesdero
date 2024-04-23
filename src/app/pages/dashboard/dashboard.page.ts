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
  todayDates: DateEvent[] = [];
  tomorrowDates: DateEvent[] = [];
  todayTitle: string;
  tomorrowTitle: string;
  articles: Article[];

  constructor(
    private datesServices: DatesService,
    private router: Router,
    private inventorySvc: InventoryService,
    private modalCtrl: ModalController,
  ) {
    this.today = moment().format('YYYY/MM/DD');
    this.tomorrow = moment().add(1, 'days').format('YYYY/MM/DD');
    this.todayTitle = moment().format('ddd D [de] MMMM');
    this.tomorrowTitle = moment().add(1, 'days').format('ddd D [de] MMMM');
  }

  ngOnInit() {
    this.datesServices.getDateByDay(this.today).subscribe((res) => {
      this.todayDates = res;
    });
    this.datesServices.getDateByDay(this.tomorrow).subscribe((res) => {
      this.tomorrowDates = res;
    });
    this.inventorySvc.getArticles().subscribe((res) => {
      this.articles = res.filter((item) => {
        console.log(item)
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
}
