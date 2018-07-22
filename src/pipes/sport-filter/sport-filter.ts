import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SportFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sportFilter',
})
export class SportFilterPipe implements PipeTransform {
  transform(sports: any, listings: any) {
    if (listings == undefined) {
    return sports;
        } else {
    return sports.filter(listings => {
    return (
    listings.sports.toLowerCase().indexOf(listings.toLowerCase()) > -1 ||
    listings.sports.toLowerCase().indexOf(listings.toLowerCase()) > -1
            );
          });
        }
      }

}
