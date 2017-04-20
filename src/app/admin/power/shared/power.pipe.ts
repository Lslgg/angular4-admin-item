import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 |  exponentialStrength:10}}
 *   formats to: 1024
*/
@Pipe({name: 'Checked'})
export class CheckedPipe implements PipeTransform {
  transform(value: string, exponent: Array<string>): boolean {
      if(!exponent) return false;
      let isExite=exponent.filter(val=> value==val);
      return isExite.length>0;
  }
}
