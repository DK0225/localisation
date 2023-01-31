import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localecurrency'
})
export class LocaleCurrencyPipe implements PipeTransform {

  transform(value: number, locale: string, currencyCode: string): string {
    return value.toLocaleString(locale, { style:'currency', currency:currencyCode });
  }

}
