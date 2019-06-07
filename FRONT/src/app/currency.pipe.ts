import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, args?: string): string {
    let formatter;
    if (args === 'eur') {
      formatter = new Intl.NumberFormat('nl-BE', {
        style: 'currency',
        currency: 'EUR',
      })
    }
    return formatter.format(value);
  }

}
