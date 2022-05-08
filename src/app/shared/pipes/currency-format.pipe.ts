import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class CurrencyFormat implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    return `${value} Ft`;
    // return null;
  }
}
