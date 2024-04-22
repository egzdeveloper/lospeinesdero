import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(array: any[], text: string, type: string): any[] {

   if (text === '') {
    return array;
   }

   text = text.toLowerCase();

   return array.filter(item => {
    return item[type].toLowerCase().includes(text);
   });
  }

}
