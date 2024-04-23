import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';
import { InventoryModalComponent } from './inventory-modal/inventory-modal.component';


@NgModule({
  declarations: [
    SidebarComponent,
    CustomerModalComponent,
    InventoryModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    CustomerModalComponent,
    InventoryModalComponent
  ]
})
export class SharedModule { }
