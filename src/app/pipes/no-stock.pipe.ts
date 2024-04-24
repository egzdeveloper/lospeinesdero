import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noStock',
})
export class NoStockPipe implements PipeTransform {

  transform(array: Array<any>): Array<any>{

    array.sort((a,b) => {
      return a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase(), 'es')
    });

    return array.filter(item => {
      return item['uds'] == 0;
    });
  }

}
