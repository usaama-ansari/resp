import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'increament'
})
export class IncreamentPipe implements PipeTransform {

  transform(value: any, args?: any): any {

    return value+1;
  }

}
