import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Customer } from '../models/customer';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService {
  mainCollection: AngularFirestoreCollection<any>;
  customersDoc: AngularFirestoreDocument<any>;
  customersCollection: AngularFirestoreCollection<Customer>;
  customers: Observable<Customer[]>;

  role: string;

  constructor(private db: AngularFirestore) {
    this.role = localStorage.getItem('role')!;
    this.loadData();
  }

  loadData() {
    this.mainCollection = this.db.collection('lospeinesdero');
    this.customersDoc = this.mainCollection.doc(this.role);
    this.customersCollection = this.customersDoc.collection('clientes');
    this.customers = this.customersCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as Customer;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
  }

  getCustomers() {
    return this.customers;
  }

  getCustomerWithID(id: string) {
    return this.db
      .collection<Customer>('lospeinesdero')
      .doc(this.role)
      .collection('clientes')
      .doc(id)
      .valueChanges();
  }

  addCustomer(date: Customer) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('clientes')
      .doc(date.id?.toString())
      .set(date);
  }

  editCustomer(date: Customer) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('clientes')
      .doc(date.id?.toString())
      .update(date);
  }

  deleteCustomer(id: string) {
    this.db
      .collection('lospeinesdero')
      .doc(this.role)
      .collection('clientes')
      .doc(id)
      .delete();
  }
}
