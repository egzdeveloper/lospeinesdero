import { Component, OnInit, ViewChild } from '@angular/core';

import {
  MbscCalendarEvent,
  MbscEventcalendarOptions,
  Notifications,
  setOptions,
  localeEs,
} from '@mobiscroll/angular';
import { DatesService } from '../../services/dates.service';
import { Router } from '@angular/router';

import { CalendarComponent, CalendarMode } from 'ionic7-calendar';
import { DateEvent } from 'src/app/models/date-event';
import { IEvent } from 'ionic7-calendar/calendar.interface';

// setOptions({
//   locale: localeEs,
//   theme: 'material',
//   themeVariant: 'auto',
// });

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  providers: [Notifications],
})
export class CalendarPage implements OnInit {
  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };
  viewTitle: string;

  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  constructor(
    private notify: Notifications,
    private datesService: DatesService,
    private router: Router
  ) {}

  myEvents: any[] = [];

  // eventSettings: MbscEventcalendarOptions = {
  //   height: '89vh',
  //   view: {
  //     calendar: { type: 'week' },
  //     agenda: { type: 'day' },
  //   },
  //   onEventClick: (args) => {
  //     this.notify.toast({
  //       message: args.event.title + ' a ' + args.event.name,
  //     });
  //   },
  //   onEventRightClick: (args) => {
  //     this.router.navigateByUrl('/add/' + args.event.id)
  //   }
  // };

  ngOnInit(): void {
    // this.datesService.getDates().subscribe((res) => {
    //   this.myEvents = res;
    // });

    this.myEvents = [
      {
        title: 'Corte',
        id: '1',
        name: 'Edu',
        day: '2023',
        startTime: new Date('2024-04-11T11:15'),
        endTime: new Date('2024-04-11T11:45'),
        price: 12
      },
      {
        title: 'Peinado',
        id: '1',
        name: 'Edu',
        day: '2023',
        startTime: new Date('2024-04-11T08:00'),
        endTime: new Date('2024-04-11T10:00'),
        price: 12
      },
    ];
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
    this.calendar.currentDate = new Date();
    this.myCal.update();
  }

  slidePrev() {
    this.myCal.slidePrev();
  }

  slideNext() {
    this.myCal.slideNext();
  }
}
