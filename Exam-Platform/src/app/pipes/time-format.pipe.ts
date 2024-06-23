import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {

  transform(value: number): unknown {
    const minutes = Math.floor(value / 60);
    const seconds = value % 60;
    return `${minutes} Min : ${seconds} Sec`;
  }

}
