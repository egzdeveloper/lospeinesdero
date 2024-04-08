import { Component, OnInit } from '@angular/core';

import {
  MbscCalendarEvent,
  MbscEventcalendarOptions,
  Notifications,
  setOptions,
  localeEs,
} from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';
import { DatesService } from '../../services/dates.service';
import { Router } from '@angular/router';

setOptions({
  locale: localeEs,
  theme: 'material',
  themeVariant: 'auto',
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  providers: [Notifications],
})
export class CalendarPage implements OnInit {
  type: 'month' | 'week' = 'week';

  constructor(
    private notify: Notifications,
    private datesService: DatesService,
    private router: Router
  ) {}

  myEvents: MbscCalendarEvent[] = [];

  eventSettings: MbscEventcalendarOptions = {
    height: '90%',
    view: {
      calendar: { type: 'week' },
      agenda: { type: 'day' },
    },
    onEventClick: (args) => {
      this.notify.toast({
        message: args.event.title + ' a ' + args.event.name,
      });
    },
    onEventRightClick: (args) => {
      this.router.navigateByUrl('/add/' + args.event.id)
    }
  };

  ngOnInit(): void {
    this.datesService.getDates().subscribe((res) => {
      this.myEvents = res;
      console.log(this.myEvents);
    });
  }

  segmentChanged(ev: CustomEvent) {

    if (ev.detail.value === 'month') {
      this.eventSettings = {
        view: {
          calendar: { type: 'month' },
          agenda: { type: 'day' },
        }
      }
    } else if (ev.detail.value === 'week') {
      this.eventSettings = {
        view: {
          calendar: { type: 'week' },
          agenda: { type: 'day' },
        }
      }
    }
  }
}
