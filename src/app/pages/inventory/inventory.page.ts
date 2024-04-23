import { Component, OnInit, inject } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Article, Category } from 'src/app/models/article';
import { GlobalService } from 'src/app/services/global.service';
import { InventoryService } from 'src/app/services/inventory.service';
import { InventoryModalComponent } from 'src/app/shared/inventory-modal/inventory-modal.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  categories: Category[];
  articles$ = inject(InventoryService).getArticles();
  articlesCount: Article[];
  searchText: string = '';
  stockCheckbox: boolean = false;

  constructor(
    private inventorySvc: InventoryService,
    private modalCtrl: ModalController,
    private globalSvc: GlobalService
  ) {
    this.categories = this.globalSvc.categories.sort((a,b) => {
      return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase(), 'es');
    });
  }

  ngOnInit() {
    this.inventorySvc.getArticles().subscribe((res) => {
      this.articlesCount = res;
    });
  }

  getBadgeColor(uds: number): string {
    if (uds <= 0) return 'danger';
    else if (uds > 0 && uds <= 5) return 'warning';
    else return 'success';
  }

  async openModal(article?: Article) {
    const modal = await this.modalCtrl.create({
      component: InventoryModalComponent,
      componentProps: {
        article: article,
      },
    });
    modal.present();
  }

  searchInput(event: any) {
    this.searchText = event.detail.value;
  }

  getNumberOfArticles(array: any[], category: string) {
    let count: number = 0;
    array.forEach(item => {
      if (item.category === category) count++;
    })
    return count;
  }

  searchNoStockArticles(event: any) {
    this.stockCheckbox = event.detail.checked;
  }
}
