import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Article, Category } from 'src/app/models/article';
import { GlobalService } from 'src/app/services/global.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { ToastService } from 'src/app/services/toast.service';

import * as uuid from 'uuid';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styleUrls: ['./inventory-modal.component.scss'],
})
export class InventoryModalComponent  implements OnInit {

  categories: Category[];
  article: Article;
  form = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl(),
    observations: new FormControl(''),
    uds: new FormControl(0, Validators.required),
  });
  title: string;
  id: string;
  exists: boolean;

  constructor(
    private modalCtrl: ModalController,
    private toastService: ToastService,
    private inventorySvc: InventoryService,
    private navParams: NavParams,
    private globalSvc: GlobalService
  ) {
    this.categories = this.globalSvc.categories;
  }

  ngOnInit() {
    this.article = this.navParams.get('article');

    if (this.article) {
      this.article = this.navParams.get('article');
      this.title = 'Editar'
      this.id = this.article.id;
      this.exists = true;
      this.form.setValue({
        name: this.article.name!,
        category: this.article.category!,
        uds: this.article.uds!,
        observations: this.article.observations!,
      });
    } else {
      this.title = 'Añadir'
      this.id =  uuid.v4();
      this.exists = false;
    }
  }

  submit() {
    this.article = {
      id: this.id,
      name: this.form.value.name!,
      category: this.form.value.category!,
      observations: this.form.value.observations!,
      uds: this.form.value.uds!,
    };

    try {

      if (this.exists) {
        this.inventorySvc.editArticle(this.article);
      } else {
        this.inventorySvc.addArticle(this.article);
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
