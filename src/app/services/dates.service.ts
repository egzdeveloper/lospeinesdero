import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { MbscCalendarEvent } from '@mobiscroll/angular';
import { DateEvent } from 'src/app/models/date-event';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  datesCollection: AngularFirestoreCollection<DateEvent>;
  dates: Observable<DateEvent[]>;

  role: string;

  constructor(
    private db: AngularFirestore,
  ) {
    this.loadData();
    this.role = localStorage.getItem('role')!;
  }

  loadData() {
    this.mainCollection = this.db.collection('lospeinesdero');
    this.datesDoc = this.mainCollection.doc('demo');
    this.datesCollection = this.datesDoc.collection('citas');
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
    return this.db
      .collection<DateEvent>('lospeinesdero')
      .doc(this.role)
      .collection('citas')
      .doc(id)
      .valueChanges();
  }

  addDate(date: DateEvent) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('citas')
      .doc(date.id?.toString())
      .set(date);
  }

  editDate(date: DateEvent) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('citas')
      .doc(date.id?.toString())
      .update(date);
  }

  deleteDate(id: string) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('citas')
      .doc(id)
      .delete();
  }

  getDateByDay(day: string) {
    const dataCollection: AngularFirestoreCollection<Date> = this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('citas', (ref) =>
        ref.where('day', '==', day).orderBy('startTime')
      );
    return dataCollection.valueChanges();
  }
}
