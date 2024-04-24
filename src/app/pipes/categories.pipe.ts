import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../models/article';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {

  transform(array: Array<any>, category: string): Array<any> {

    array.sort((a,b) => {
      return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase(), 'es')
    });

    return array.filter(item => {
      return item['category'] == category;
    });
   }

}
