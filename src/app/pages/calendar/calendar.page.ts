import { Component, OnInit, ViewChild } from '@angular/core';
import { DatesService } from '../../services/dates.service';
import { Router } from '@angular/router';

import { CalendarComponent, CalendarMode } from 'ionic7-calendar';
import { DateEvent } from 'src/app/models/date-event';
import { IEvent } from 'ionic7-calendar/calendar.interface';

import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };
  viewTitle: string;

  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  constructor(
    private datesService: DatesService,
    private router: Router
  ) {}

  myEvents: any[] = [];

  ngOnInit(): void {
    this.datesService.getDates().subscribe((res) => {
      res.forEach(date => {
        date.startTime = new Date(date.startTime);
        date.endTime = new Date(date.endTime);
      });

      this.myEvents = res;
    });
  }

  onEventSelected(ev: IEvent) {
    console.log(ev.title);
  }

  segmentChanged(ev: CustomEvent) {
    this.calendar.mode = ev.detail.value;
  }

  addDate() {
    this.router.navigateByUrl('add');
  }

  setToday() {
    this.myCal.currentDate = new Date();
    this.myCal.update();
  }

  slidePrev() {
    this.myCal.slidePrev();
  }

  slideNext() {
    this.myCal.slideNext();
  }

  formatDate(date: string): string {
    return moment(date).format('HH:mm')
  }

  editDate(id: string) {
    console.log(id)
    this.router.navigateByUrl('/add/' + id);
  }
}
