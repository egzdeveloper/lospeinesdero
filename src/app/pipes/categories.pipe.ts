import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../models/article';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(array: Array<any>, category: string): Array<any> {
    return array.filter(item => {
      return item['category'] == category;
    });
   }

}
