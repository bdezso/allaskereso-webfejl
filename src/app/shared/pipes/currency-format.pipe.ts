import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormat implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    return `${value} Ft`;
  }
}
