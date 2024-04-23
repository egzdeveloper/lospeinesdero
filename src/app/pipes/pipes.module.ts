import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { CategoriesPipe } from './categories.pipe';
import { NoStockPipe } from './no-stock.pipe';

@NgModule({
  declarations: [FilterPipe, CategoriesPipe, NoStockPipe],
  exports: [FilterPipe, CategoriesPipe, NoStockPipe],
})
export class PipesModule {}
