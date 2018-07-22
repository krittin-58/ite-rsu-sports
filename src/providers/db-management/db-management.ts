import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the DbManagementProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DbManagementProvider {
  constructor(public http: HttpClient) {}
  read(url) {
    return new Promise(resolve => {
      this.http.get(url).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }
  manageData(url, data) {
    return new Promise(resolve => {
      this.http.post(url, data).subscribe(
        data => {
          resolve(data);
        },
        err => {
          console.log(err);
        }
      );
    });
  }




}


