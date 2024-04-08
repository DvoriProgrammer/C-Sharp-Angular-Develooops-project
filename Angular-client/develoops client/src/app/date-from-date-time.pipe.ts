import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFromDateTime',
  standalone: true
})
export class DateFromDateTimePipe implements PipeTransform {

  transform(value:Date): any {
    if (value) {
      const date = new Date(value);
      return date.toISOString().split('T')[0];
    }
    return null;
  }
}
