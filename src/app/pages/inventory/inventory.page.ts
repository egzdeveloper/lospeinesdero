import { Component, OnInit } from '@angular/core';
import { Article, Category } from 'src/app/models/article';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  categories: Category[];
  articles: Article[];

  constructor() {
    this.categories = [
      { name: 'Tintes' },
      { name: 'Mechas' }
    ];
  }

  ngOnInit() {
    console.log();
  }

  getBardgeColor(uds: number): string {
    if (uds <= 0) return 'danger'
    else if (uds > 0 && uds <= 5) return 'warning';
    else return 'success';
  }

}
