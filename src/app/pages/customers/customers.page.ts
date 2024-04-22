import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Customer } from 'src/app/models/customer';
import { CustomersService } from 'src/app/services/customers.service';
import { CustomerModalComponent } from 'src/app/shared/customer-modal/customer-modal.component';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  customers: Customer[];
  searchText: string = '';

  constructor(
    private customerService: CustomersService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.customerService.getCustomers().subscribe((res) => {
      this.customers = res;
      this.customers.sort((a,b) => {
        return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase(), 'es');
      })
    });
  }

  async openModal(customer?: Customer, slidingItem?: any) {
    const modal = await this.modalCtrl.create({
      component: CustomerModalComponent,
      componentProps: {
        'customer': customer
      }
    });
    modal.present();
    if (slidingItem) slidingItem.close();
  }

  async deleteCustomer(id: string) {
    const alert = await this.alertCtrl.create({
      header: 'Eliminar Cliente',
      message: 'Esta acción es irreversible. ¿Desea continuar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.customerService.deleteCustomer(id);
            this.toastService.presentToast(
              'Los datos se han eliminado correctamente',
              'top',
              'warning',
              1500,
              'trash'
            );
          },
        },
      ],
    });

    await alert.present();
  }

  searchInput(event: any) {
    this.searchText = event.detail.value;
  }
}
