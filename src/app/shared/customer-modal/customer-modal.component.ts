import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { ToastService } from 'src/app/services/toast.service';

import * as uuid from 'uuid';

@Component({
  selector: 'app-customer-modal',
  templateUrl: './customer-modal.component.html',
  styleUrls: ['./customer-modal.component.scss'],
})
export class CustomerModalComponent implements OnInit {
  customer: Customer;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    phone: new FormControl(''),
    observations: new FormControl(''),
    photo: new FormControl(''),
  });
  title: string;
  id: string;

  constructor(
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private customerSvc: CustomersService,
    private navParams: NavParams
  ) {}

  ngOnInit() {
    this.customer = this.navParams.get('customer');

    if (this.customer) {
      this.customer = this.navParams.get('customer');
      this.title = 'Editar'
      this.id = this.customer.id;
      this.form.setValue({
        name: this.customer.name!,
        phone: this.customer.phone!,
        observations: this.customer.observations!,
        photo: this.customer.photo!,
      });
    } else {
      this.title = 'Añadir'
      this.id =  uuid.v4();
    }
  }

  submit() {
    this.customer = {
      id: this.id,
      name: this.form.value.name!,
      phone: this.form.value.phone!,
      observations: this.form.value.observations!,
      photo: this.form.value.photo!,
    };

    try {

      if (this.customer) {
        this.customerSvc.editCustomer(this.customer);
      } else {
        this.customerSvc.addCustomer(this.customer);
      }

      this.toastService.presentToast(
        'Los datos se han guardado correctamente',
        'top',
        'success',
        1500,
        'save'
      );
      this.form.reset();
      this.modalDismiss();
    } catch (e) {
      this.toastService.presentToast(
        'Se ha producido un error',
        'top',
        'danger',
        1500,
        'close'
      );
    }
  }

  modalDismiss() {
    return this.modalCtrl.dismiss();
  }
}
