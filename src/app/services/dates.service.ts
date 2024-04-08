import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, map } from 'rxjs';
import { Date } from '../models/date';
import { MbscCalendarEvent } from '@mobiscroll/angular';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  datesCollection: AngularFirestoreCollection<MbscCalendarEvent>;
  dates: Observable<MbscCalendarEvent[]>;

  constructor(public db: AngularFirestore) {
    this.datesCollection = this.db.collection('citas');
    this.dates = this.datesCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as MbscCalendarEvent;
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

  addDate(date: MbscCalendarEvent) {
    this.db.collection('citas').doc(date.id?.toString()).set(date);
  }

  editDate(date: MbscCalendarEvent) {
    this.db.collection('citas').doc(date.id?.toString()).update(date);
  }

  deleteDate(id: string) {
    this.db.collection('citas').doc(id).delete();
  }
}
