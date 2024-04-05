import { Component, OnInit } from '@angular/core';

import { MbscCalendarEvent, MbscEventcalendarOptions, Notifications, setOptions, localeEs } from '@mobiscroll/angular';
import { HttpClient } from '@angular/common/http';

setOptions({
  locale: localeEs,
  theme: 'material',
  themeVariant: 'dark',
});

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
  providers: [Notifications]
})
export class CalendarPage implements OnInit {
  constructor(
    private http: HttpClient,
    private notify: Notifications,
  ) {}

  myEvents: MbscCalendarEvent[] = [];

  eventSettings: MbscEventcalendarOptions = {
    clickToCreate: false,
    dragToCreate: false,
    dragToMove: false,
    dragToResize: false,
    eventDelete: false,
    view: {
      calendar: { type: 'month' },
      agenda: { type: 'month' },
    },
    onEventClick: (args) => {
      this.notify.toast({
        message: args.event.title,
      });
    },
  };

  ngOnInit(): void {
    // this.http.jsonp<MbscCalendarEvent[]>('https://trial.mobiscroll.com/events/?vers=5', 'callback').subscribe((resp) => {
    //   this.myEvents = resp;
    //   console.log(resp);
    // });

    this.myEvents = [
      {
        color: '#ff6d42',
        start: '2024-04-08T09:30:00.000Z',
        end: '2024-04-08T11:00:00.000Z',
        id: 'mscb_1',
        title: 'Mechas',
      },
      {
        color: '#7bde83',
        start: '2024-04-08T12:00:00.000Z',
        end: '2024-04-08T11:30:00.000Z',
        id: 'mscb_2',
        title: 'Lavado de pelo'
      },
    ]
  }

}
