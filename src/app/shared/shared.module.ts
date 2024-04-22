import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerModalComponent } from './customer-modal/customer-modal.component';


@NgModule({
  declarations: [
    SidebarComponent,
    CustomerModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    SidebarComponent,
    CustomerModalComponent
  ]
})
export class SharedModule { }
