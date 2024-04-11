import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { MbscCalendarEvent } from '@mobiscroll/angular';
import { DateEvent } from 'src/app/models/date-event';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  datesCollection: AngularFirestoreCollection<DateEvent>;
  dates: Observable<DateEvent[]>;

  constructor(public db: AngularFirestore) {
    this.datesCollection = this.db.collection('citas');
    this.dates = this.datesCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as DateEvent;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getDates() {
    return this.dates;
  }

  getDatewithID(id: string) {
    return this.db.collection<any>('citas').doc(id).valueChanges();
  }

  addDate(date: DateEvent) {
    this.db.collection('citas').doc(date.id?.toString()).set(date);
  }

  editDate(date: DateEvent) {
    this.db.collection('citas').doc(date.id?.toString()).update(date);
  }

  deleteDate(id: string) {
    this.db.collection('citas').doc(id).delete();
  }

  getDateByDay(day: string) {
    const dataCollection: AngularFirestoreCollection<DateEvent> = this.db.collection('citas', ref => ref.where('day', '==', day).orderBy('start'));
    return dataCollection.valueChanges();
  }
}
