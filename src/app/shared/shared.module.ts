import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule
  ],
  exports: [
    SidebarComponent
  ]
})
export class SharedModule { }
