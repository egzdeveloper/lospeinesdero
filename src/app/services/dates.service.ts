import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Date } from '../models/date';
import { MbscCalendarEvent } from '@mobiscroll/angular';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  mainCollection: AngularFirestoreCollection<any>;
  datesDoc: AngularFirestoreDocument<any>;
  datesCollection: AngularFirestoreCollection<MbscCalendarEvent>;
  dates: Observable<MbscCalendarEvent[]>;

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
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as MbscCalendarEvent;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
  }

  getDates() {
    return this.dates;
  }

  getDatewithID(id: string) {
    return this.db
      .collection<any>('lospeinesdero')
      .doc(this.role)
      .collection('citas')
      .doc(id)
      .valueChanges();
  }

  addDate(date: MbscCalendarEvent) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('citas')
      .doc(date.id?.toString())
      .set(date);
  }

  editDate(date: MbscCalendarEvent) {
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
        ref.where('day', '==', day).orderBy('start')
      );
    return dataCollection.valueChanges();
  }
}
