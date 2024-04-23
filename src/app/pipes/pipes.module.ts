import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { CategoriesPipe } from './categories.pipe';



@NgModule({
  declarations: [FilterPipe, CategoriesPipe],
  exports: [FilterPipe, CategoriesPipe]
})
export class PipesModule { }
