import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
/**
 * Generated class for the MomentFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'momentFilter',
})
export class MomentFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string) {
    moment.locale('th');
    moment.duration('days').humanize();
    moment.duration(1, "minutes").locale("th").humanize();
    return moment(value).fromNow();
  }
}
