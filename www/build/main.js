webpackJsonp([1],{

/***/ 153:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 153;

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/login/login.module": [
		578,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 197;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_db_management_db_management__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angularfire2_storage__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__ = __webpack_require__(63);
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import * as firebase from 'firebase'


//import { map } from 'rxjs/operators';
//import { CountdownTimerModule } from 'ngx-countdown-timer';
//import * as moment from 'moment';


var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, db, afs, afAuth, storage) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.afs = afs;
        this.afAuth = afAuth;
        this.storage = storage;
        //this.url = "http://localhost/api/dboperation.php";
        this.getFacultyFireStore();
        //this.getBranchFireStore();
        this.getListingsFireStore();
        this.getFacultyListFireStore();
        //this.getBranchListFireStore();
        this.getSportsList();
        this.getStatusList();
        this.tmp = {};
        this.form = "hide";
    }
    HomePage_1 = HomePage;
    HomePage.prototype.getFacultyFireStore = function () {
        this.facultyCollection = this.afs.collection("faculty");
        // this.items = this.itemsCollection.valueChanges();
        this.faculty = this.facultyCollection.snapshotChanges().map(function (actions) {
            return actions.map(function (action) { return (__assign({ $key: action.payload.doc.id }, action.payload.doc.data())); });
        });
        console.log(this.faculty);
    };
    HomePage.prototype.getListingsFireStore = function () {
        this.listingsCollection = this.afs.collection("listings");
        this.listings = this.listingsCollection.snapshotChanges().map(function (actions) {
            return actions.map(function (action) { return (__assign({ $key: action.payload.doc.id }, action.payload.doc.data())); });
        });
        console.log(this.listings);
    };
    HomePage.prototype.loginWithGG = function () {
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"].GoogleAuthProvider());
        __WEBPACK_IMPORTED_MODULE_6_firebase_app__["auth"]().getRedirectResult().then(function (authData) {
            this.navCtrl.push(HomePage_1);
        }).catch(function (error) {
            console.log(error);
        });
        /*if(this.afAuth.auth.signInWithPopup) {
          this.goToListings();
        } else {
          this.goToLoginPage();
        }*/
    };
    HomePage.prototype.logoutGG = function () {
        this.afAuth.auth.signOut();
    };
    HomePage.prototype.goToLoginPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
    };
    HomePage.prototype.searchItems = function (ev) {
        var val = ev.target.value;
        var filterd;
        filterd = this.sports.filter(function (item) {
            return (item.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
                item.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1);
        });
        this.somesports = filterd;
    };
    // faculty //
    HomePage.prototype.facultyOperation = function (tmp, action) {
        var _this = this;
        if (action == "add") {
            var timestamp = new Date().getUTCMilliseconds();
            tmp.id = timestamp;
            var tmpCollection = this.afs.collection("faculty");
            tmpCollection
                .add(tmp)
                .then(function (added) {
                console.log(added.id);
                _this.tmp = {};
                _this.form = "hide";
            })
                .catch(function (e) {
                console.log("Error", e);
            });
        }
        else if (action == "delete") {
            console.log(tmp.$key);
            var r = confirm("Confirm to Delete Item ID = " + tmp.$key);
            if (r == true) {
                this.facultyCollection.doc(tmp.$key).delete();
                //this.storage.storage.refFromURL(tmp.photo).delete();
            }
        }
        else if (action == "edit") {
            this.facultyCollection = this.afs.collection("faculty", function (ref) { return ref.where("id", "==", tmp.id); });
            this.editItems = this.facultyCollection.snapshotChanges().map(function (actions) {
                return actions.map(function (action) { return (__assign({ $key: action.payload.doc.id }, action.payload.doc.data())); });
            });
            this.editItems.forEach(function (element) {
                console.log(element);
                _this.tmp = element[0];
                //this.photoforupdate = this.tmp.photo;
            });
            this.form = "edit";
        }
        else if (action == "update") {
            this.facultyDoc = this.afs.doc("faculty/" + tmp.$key);
            this.facDoc = this.facultyDoc.valueChanges();
            this.facultyDoc.update(tmp);
            //this.storage.storage.refFromURL(this.photoforupdate).delete();
            this.tmp = {};
            this.form = "hide";
        }
    };
    HomePage.prototype.listingsOperation = function (tmp, action) {
        var _this = this;
        if (action == "add") {
            var timestamp = new Date().getUTCMilliseconds();
            tmp.id = timestamp;
            var tmpCollection = this.afs.collection("listings");
            tmpCollection
                .add(tmp)
                .then(function (added) {
                console.log(added.id);
                _this.tmp = {};
                _this.form = "hide";
            })
                .catch(function (e) {
                console.log("Error", e);
            });
        }
        else if (action == "delete") {
            console.log(tmp.$key);
            var r = confirm("Confirm to Delete Item ID = " + tmp.$key);
            if (r == true) {
                this.listingsCollection.doc(tmp.$key).delete();
                //this.storage.storage.refFromURL(tmp.photo).delete();
            }
        }
        else if (action == "edit") {
            this.listingsCollection = this.afs.collection("listings", function (ref) {
                return ref.where("id", "==", tmp.id);
            });
            this.listings = this.listingsCollection.snapshotChanges().map(function (actions) {
                return actions.map(function (action) { return (__assign({ $key: action.payload.doc.id }, action.payload.doc.data())); });
            });
            this.listings.forEach(function (element) {
                console.log(element);
                _this.tmp = element[0];
            });
            this.form = "edit";
        }
        else if (action == "update") {
            this.listingsDoc = this.afs.doc("listings/" + tmp.$key);
            this.listDoc = this.listingsDoc.valueChanges();
            this.listingsDoc.update(tmp);
            this.tmp = {};
            this.form = "hide";
        }
    };
    HomePage.prototype.wantToAdd = function () {
        this.form = "add";
        this.tmp = {};
    };
    HomePage.prototype.getFacultyListFireStore = function () {
        this.facultyAddList = this.afs.collection("faculty");
        //this.facultyAdd = this.facultyAddList.valueChanges();
        this.facultyAdd = this.facultyAddList.snapshotChanges().map(function (actions) {
            return actions.map(function (action) { return (__assign({ $key: action.payload.doc.id }, action.payload.doc.data())); });
        });
        console.log(this.facultyAdd);
    };
    HomePage.prototype.getSportsList = function () {
        this.sportAddList = this.afs.collection("sports");
        //this.sportAdd = this.sportAddList.valueChanges();
        this.sportAdd = this.sportAddList.snapshotChanges().map(function (actions) {
            return actions.map(function (action) { return (__assign({ $key: action.payload.doc.id }, action.payload.doc.data())); });
        });
        console.log(this.sportAdd);
    };
    HomePage.prototype.getStatusList = function () {
        this.statusAddList = this.afs.collection("status");
        //this.statusAdd = this.statusAddList.valueChanges();
        this.statusAdd = this.statusAddList.snapshotChanges().map(function (actions) {
            return actions.map(function (action) { return (__assign({ $key: action.payload.doc.id }, action.payload.doc.data())); });
        });
        console.log(this.statusAdd);
    };
    HomePage = HomePage_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "page-home",template:/*ion-inline-start:"/Users/krittinj/Desktop/work/ite-rsu-sports/src/pages/home/home.html"*/'<!DOCTYPE html>\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<!--<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.7.0/css/bulma.min.css">\n    <script defer src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"></script> -->\n    <ion-header>\n    <ion-navbar>\n    <button ion-button menuToggle>\n    <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Sports</ion-title>\n    </ion-navbar>\n    </ion-header>\n<ion-content padding>\n\n\n    <!--<button ion-button round block color="danger" (click)="logoutGG()">ออกจากระบบ</button> -->\n  <button *ngIf="form==\'hide\'" ion-button round block color="secondary" (click)="wantToAdd()">เพิ่มรายการใหม่</button>\n  <button *ngIf="form!=\'hide\'" ion-button round block color="danger" (click)="form=\'hide\'">Hide Form</button>\n\n  <form (ngSubmit)="listingsOperation(tmp, action)" *ngIf="form != \'hide\'">\n      <ion-list>\n          <ion-item>\n        <ion-label>คณะ A</ion-label>\n          <ion-select [(ngModel)]="tmp.faculty_a" name="faculty_a">\n            <ion-option *ngFor="let option of facultyAdd | async" [value]="option.name">{{option.name}}</ion-option>\n          </ion-select>\n        </ion-item>\n\n            <ion-item>\n                <ion-label>คณะ B</ion-label>\n                  <ion-select [(ngModel)]="tmp.faculty_b" name="faculty_b">\n                      <ion-option *ngFor="let option of facultyAdd | async" [value]="option.name">{{option.name}}</ion-option>\n                  </ion-select>\n                </ion-item>\n                    <ion-item>\n                        <ion-label>เลือกกีฬา:</ion-label>\n                          <ion-select [(ngModel)]="tmp.sport" name="sport">\n                            <ion-option *ngFor="let option of sportAdd | async" [value]="option.name">{{option.name}}</ion-option>\n                          </ion-select>\n                        </ion-item>\n                        <ion-item>\n                            <ion-label>แข่งวันที่</ion-label>\n                            <ion-datetime displayFormat="MMM DD YYYY hh:mm A" pickerFormat="MMM DD YYYY h mm A" [(ngModel)]="tmp.month" name="TimeStart"></ion-datetime>\n                          </ion-item>\n                        <ion-item>\n                            <ion-label>สถานะ:</ion-label>\n                              <ion-select [(ngModel)]="tmp.status" name="status">\n                                <ion-option *ngFor="let option of statusAdd | async" [value]="option.status_name">{{option.status_name}}</ion-option>\n                              </ion-select>\n                            </ion-item>\n        <button *ngIf="form==\'add\'" ion-button round block type="submit" color="secondary" (click)="action=\'add\'">Add</button>\n        <button *ngIf="form==\'edit\'" ion-button round block type="submit" color="secondary" (click)="action=\'update\'">Update</button>\n      </ion-list>\n    </form>\n\n\n\n\n\n    <!--<div padding>\n      <ion-segment [(ngModel)]="listings">\n        <ion-segment-button value=\'\'>\n          เมื่อวาน\n        </ion-segment-button>\n        <ion-segment-button value=\'\'>\n          วันนี้\n        </ion-segment-button>\n        <ion-segment-button value=\'\'>\n          พรุ่งนี้\n        </ion-segment-button>\n      </ion-segment>\n    </div> -->\n\n\n\n\n  <!--<form id="branch" (ngSubmit)="branchOperation(tmp, action)" *ngIf="form != \'hide\'">\n      <ion-list>\n        <ion-item>\n          <ion-label floating>ชื่อสาขา</ion-label>\n          <ion-input [(ngModel)]="tmp.name" type="text" name="name"></ion-input>\n        </ion-item>\n\n\n        <button *ngIf="form==\'add\'" ion-button round block type="submit" (click)="action=\'add\'">Add</button>\n        <button *ngIf="form==\'edit\'" ion-button round block type="submit" (click)="action=\'update\'">Update</button>\n      </ion-list>\n    </form>\n\n  <form id="faculty" (ngSubmit)="facultyOperation(tmp, action)" *ngIf="form != \'hide\'">\n    <ion-list>\n      <ion-item>\n        <ion-label floating>ชื่อคณะ</ion-label>\n        <ion-input [(ngModel)]="tmp.name" type="text" name="name"></ion-input>\n      </ion-item>\n\n\n      <button *ngIf="form==\'add\'" ion-button round block type="submit" (click)="action=\'add\'">Add</button>\n      <button *ngIf="form==\'edit\'" ion-button round block type="submit" (click)="action=\'update\'">Update</button>\n    </ion-list>\n  </form> -->\n\n\n  <ion-list *ngIf="listings">\n    <ion-item *ngFor="let listings of listings | async">\n\n      <ion-grid>\n        <ion-row padding>\n          <ion-col col-md-2>\n              {{listings.sport}}\n\n          </ion-col>\n          <ion-col col-md-2>\n              {{listings.faculty_a}}\n          </ion-col>\n          <!--<ion-col col-md-2>\n              <ion-icon name="fastforward" item-start></ion-icon>\n          </ion-col> -->\n          <ion-col col-md-2>\n              {{listings.faculty_b}}\n\n          </ion-col>\n          <ion-col col-md-2>\n              <ion-icon name="ios-timer" item-start> {{ listings.month | momentFilter}}</ion-icon>\n          </ion-col>\n            <ion-col col-md-4>\n                {{listings.status}}\n\n              </ion-col>\n\n        </ion-row>\n      </ion-grid>\n\n\n\n\n<ion-icon name="create" (click)="listingsOperation(listings, \'edit\')" item-end></ion-icon>\n        <ion-icon name="trash" (click)="listingsOperation(listings, \'delete\')" item-end></ion-icon>\n\n    </ion-item>\n  </ion-list>\n\n\n\n<!-- <p>รายชื่อคณะ</p>\n  <ion-list *ngIf="faculty">\n    <ion-item *ngFor="let faculty of faculty | async">\n\n        <ion-row>\n          <ion-col col-6>\n            {{faculty.name}}\n          </ion-col>\n        </ion-row>\n\n<ion-icon name="create" (click)="facultyOperation(faculty, \'edit\')" item-end></ion-icon>\n        <ion-icon name="trash" (click)="facultyOperation(faculty, \'delete\')" item-end></ion-icon>\n\n    </ion-item>\n  </ion-list>\n\n\n\n  <form (ngSubmit)="branchOperation(tmp, action)" *ngIf="form != \'hide\'">\n      <ion-list>\n        <ion-item>\n          <ion-label floating>ชื่อสาขา</ion-label>\n          <ion-input [(ngModel)]="tmp.name" type="text" name="name"></ion-input>\n        </ion-item>\n\n        <button *ngIf="form==\'add\'" ion-button round block type="submit" (click)="action=\'add\'">Add</button>\n        <button *ngIf="form==\'edit\'" ion-button round block type="submit" (click)="action=\'update\'">Update</button>\n      </ion-list>\n    </form>\n\n\n  <p>รายชื่อสาขา</p>\n  <ion-list *ngIf="branch">\n    <ion-item *ngFor="let branch of branch | async">\n\n        <ion-row>\n          <ion-col col-6>\n            {{branch.name}}\n          </ion-col>\n        </ion-row>\n\n<ion-icon name="create" (click)="branchOperation(branch, \'edit\')" item-end></ion-icon>\n        <ion-icon name="trash" (click)="branchOperation(branch, \'delete\')" item-end></ion-icon>\n\n    </ion-item>\n  </ion-list> -->\n\n\n\n\n\n</ion-content>\n\n\n<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment-with-locales.min.js"></script>\n'/*ion-inline-end:"/Users/krittinj/Desktop/work/ite-rsu-sports/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_db_management_db_management__["a" /* DbManagementProvider */],
            __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["a" /* AngularFirestore */],
            __WEBPACK_IMPORTED_MODULE_7_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_4_angularfire2_storage__["a" /* AngularFireStorage */]])
    ], HomePage);
    return HomePage;
    var HomePage_1;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 249:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DbManagementProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the DbManagementProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var DbManagementProvider = /** @class */ (function () {
    function DbManagementProvider(http) {
        this.http = http;
    }
    DbManagementProvider.prototype.read = function (url) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(url).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    DbManagementProvider.prototype.manageData = function (url, data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(url, data).subscribe(function (data) {
                resolve(data);
            }, function (err) {
                console.log(err);
            });
        });
    };
    DbManagementProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], DbManagementProvider);
    return DbManagementProvider;
}());

//# sourceMappingURL=db-management.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(403);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export firebaseConfig */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(468);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_db_management_db_management__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_firestore__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_storage__ = __webpack_require__(256);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ngx_countdown_timer__ = __webpack_require__(573);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_ngx_countdown_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_ngx_countdown_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pipes_sport_filter_sport_filter__ = __webpack_require__(574);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pipes_moment_filter_moment_filter__ = __webpack_require__(575);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_login_login__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__ionic_native_facebook__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














//import * as moment from 'moment';





var firebaseConfig = {
    apiKey: "AIzaSyAe3xgjZPL9MZOnIWeZCnqkbS_yQ90WHac",
    authDomain: "rsu-sport-ite465.firebaseapp.com",
    databaseURL: "https://rsu-sport-ite465.firebaseio.com",
    projectId: "rsu-sport-ite465",
    storageBucket: "rsu-sport-ite465.appspot.com",
    messagingSenderId: "769425239891"
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["NgModule"])({
            declarations: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_14__pipes_sport_filter_sport_filter__["a" /* SportFilterPipe */], __WEBPACK_IMPORTED_MODULE_15__pipes_moment_filter_moment_filter__["a" /* MomentFilterPipe */], __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */]],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["a" /* AngularFireModule */].initializeApp(firebaseConfig),
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_firestore__["b" /* AngularFirestoreModule */].enablePersistence(),
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_storage__["b" /* AngularFireStorageModule */],
                __WEBPACK_IMPORTED_MODULE_13_ngx_countdown_timer__["CountdownTimerModule"].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */], __WEBPACK_IMPORTED_MODULE_16__pages_login_login__["a" /* LoginPage */]],
            providers: [
                __WEBPACK_IMPORTED_MODULE_5__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_8__providers_db_management_db_management__["a" /* DbManagementProvider */], __WEBPACK_IMPORTED_MODULE_17_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_18__ionic_native_facebook__["a" /* Facebook */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 468:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(248);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_login_login__ = __webpack_require__(75);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MyApp = /** @class */ (function () {
    function MyApp(auth, platform, statusBar, splashScreen) {
        var _this = this;
        this.auth = auth;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */];
        this.initializeApp();
        this.auth.authState.subscribe(function (user) {
            console.log(user);
            if (!user) {
                _this.pages = [
                    { title: 'Login', component: __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */] }
                ];
            }
            else {
                _this.user = user;
                _this.pages = [
                    { title: 'Profile', component: __WEBPACK_IMPORTED_MODULE_6__pages_login_login__["a" /* LoginPage */] },
                    { title: 'Sports', component: __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */] },
                ];
            }
        });
    }
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["e" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/krittinj/Desktop/work/ite-rsu-sports/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu>\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/krittinj/Desktop/work/ite-rsu-sports/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_angularfire2_auth__["a" /* AngularFireAuth */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["h" /* Platform */], __WEBPACK_IMPORTED_MODULE_1__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 574:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SportFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
 * Generated class for the SportFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var SportFilterPipe = /** @class */ (function () {
    function SportFilterPipe() {
    }
    SportFilterPipe.prototype.transform = function (sports, listings) {
        if (listings == undefined) {
            return sports;
        }
        else {
            return sports.filter(function (listings) {
                return (listings.sports.toLowerCase().indexOf(listings.toLowerCase()) > -1 ||
                    listings.sports.toLowerCase().indexOf(listings.toLowerCase()) > -1);
            });
        }
    };
    SportFilterPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'sportFilter',
        })
    ], SportFilterPipe);
    return SportFilterPipe;
}());

//# sourceMappingURL=sport-filter.js.map

/***/ }),

/***/ 575:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MomentFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


/**
 * Generated class for the MomentFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
var MomentFilterPipe = /** @class */ (function () {
    function MomentFilterPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    MomentFilterPipe.prototype.transform = function (value) {
        __WEBPACK_IMPORTED_MODULE_1_moment__["locale"]('th');
        __WEBPACK_IMPORTED_MODULE_1_moment__["duration"]('days').humanize();
        __WEBPACK_IMPORTED_MODULE_1_moment__["duration"](1, "minutes").locale("th").humanize();
        return __WEBPACK_IMPORTED_MODULE_1_moment__(value).fromNow();
    };
    MomentFilterPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
            name: 'momentFilter',
        })
    ], MomentFilterPipe);
    return MomentFilterPipe;
}());

//# sourceMappingURL=moment-filter.js.map

/***/ }),

/***/ 577:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 273,
	"./af.js": 273,
	"./ar": 274,
	"./ar-dz": 275,
	"./ar-dz.js": 275,
	"./ar-kw": 276,
	"./ar-kw.js": 276,
	"./ar-ly": 277,
	"./ar-ly.js": 277,
	"./ar-ma": 278,
	"./ar-ma.js": 278,
	"./ar-sa": 279,
	"./ar-sa.js": 279,
	"./ar-tn": 280,
	"./ar-tn.js": 280,
	"./ar.js": 274,
	"./az": 281,
	"./az.js": 281,
	"./be": 282,
	"./be.js": 282,
	"./bg": 283,
	"./bg.js": 283,
	"./bm": 284,
	"./bm.js": 284,
	"./bn": 285,
	"./bn.js": 285,
	"./bo": 286,
	"./bo.js": 286,
	"./br": 287,
	"./br.js": 287,
	"./bs": 288,
	"./bs.js": 288,
	"./ca": 289,
	"./ca.js": 289,
	"./cs": 290,
	"./cs.js": 290,
	"./cv": 291,
	"./cv.js": 291,
	"./cy": 292,
	"./cy.js": 292,
	"./da": 293,
	"./da.js": 293,
	"./de": 294,
	"./de-at": 295,
	"./de-at.js": 295,
	"./de-ch": 296,
	"./de-ch.js": 296,
	"./de.js": 294,
	"./dv": 297,
	"./dv.js": 297,
	"./el": 298,
	"./el.js": 298,
	"./en-au": 299,
	"./en-au.js": 299,
	"./en-ca": 300,
	"./en-ca.js": 300,
	"./en-gb": 301,
	"./en-gb.js": 301,
	"./en-ie": 302,
	"./en-ie.js": 302,
	"./en-il": 303,
	"./en-il.js": 303,
	"./en-nz": 304,
	"./en-nz.js": 304,
	"./eo": 305,
	"./eo.js": 305,
	"./es": 306,
	"./es-do": 307,
	"./es-do.js": 307,
	"./es-us": 308,
	"./es-us.js": 308,
	"./es.js": 306,
	"./et": 309,
	"./et.js": 309,
	"./eu": 310,
	"./eu.js": 310,
	"./fa": 311,
	"./fa.js": 311,
	"./fi": 312,
	"./fi.js": 312,
	"./fo": 313,
	"./fo.js": 313,
	"./fr": 314,
	"./fr-ca": 315,
	"./fr-ca.js": 315,
	"./fr-ch": 316,
	"./fr-ch.js": 316,
	"./fr.js": 314,
	"./fy": 317,
	"./fy.js": 317,
	"./gd": 318,
	"./gd.js": 318,
	"./gl": 319,
	"./gl.js": 319,
	"./gom-latn": 320,
	"./gom-latn.js": 320,
	"./gu": 321,
	"./gu.js": 321,
	"./he": 322,
	"./he.js": 322,
	"./hi": 323,
	"./hi.js": 323,
	"./hr": 324,
	"./hr.js": 324,
	"./hu": 325,
	"./hu.js": 325,
	"./hy-am": 326,
	"./hy-am.js": 326,
	"./id": 327,
	"./id.js": 327,
	"./is": 328,
	"./is.js": 328,
	"./it": 329,
	"./it.js": 329,
	"./ja": 330,
	"./ja.js": 330,
	"./jv": 331,
	"./jv.js": 331,
	"./ka": 332,
	"./ka.js": 332,
	"./kk": 333,
	"./kk.js": 333,
	"./km": 334,
	"./km.js": 334,
	"./kn": 335,
	"./kn.js": 335,
	"./ko": 336,
	"./ko.js": 336,
	"./ky": 337,
	"./ky.js": 337,
	"./lb": 338,
	"./lb.js": 338,
	"./lo": 339,
	"./lo.js": 339,
	"./lt": 340,
	"./lt.js": 340,
	"./lv": 341,
	"./lv.js": 341,
	"./me": 342,
	"./me.js": 342,
	"./mi": 343,
	"./mi.js": 343,
	"./mk": 344,
	"./mk.js": 344,
	"./ml": 345,
	"./ml.js": 345,
	"./mn": 346,
	"./mn.js": 346,
	"./mr": 347,
	"./mr.js": 347,
	"./ms": 348,
	"./ms-my": 349,
	"./ms-my.js": 349,
	"./ms.js": 348,
	"./mt": 350,
	"./mt.js": 350,
	"./my": 351,
	"./my.js": 351,
	"./nb": 352,
	"./nb.js": 352,
	"./ne": 353,
	"./ne.js": 353,
	"./nl": 354,
	"./nl-be": 355,
	"./nl-be.js": 355,
	"./nl.js": 354,
	"./nn": 356,
	"./nn.js": 356,
	"./pa-in": 357,
	"./pa-in.js": 357,
	"./pl": 358,
	"./pl.js": 358,
	"./pt": 359,
	"./pt-br": 360,
	"./pt-br.js": 360,
	"./pt.js": 359,
	"./ro": 361,
	"./ro.js": 361,
	"./ru": 362,
	"./ru.js": 362,
	"./sd": 363,
	"./sd.js": 363,
	"./se": 364,
	"./se.js": 364,
	"./si": 365,
	"./si.js": 365,
	"./sk": 366,
	"./sk.js": 366,
	"./sl": 367,
	"./sl.js": 367,
	"./sq": 368,
	"./sq.js": 368,
	"./sr": 369,
	"./sr-cyrl": 370,
	"./sr-cyrl.js": 370,
	"./sr.js": 369,
	"./ss": 371,
	"./ss.js": 371,
	"./sv": 372,
	"./sv.js": 372,
	"./sw": 373,
	"./sw.js": 373,
	"./ta": 374,
	"./ta.js": 374,
	"./te": 375,
	"./te.js": 375,
	"./tet": 376,
	"./tet.js": 376,
	"./tg": 377,
	"./tg.js": 377,
	"./th": 378,
	"./th.js": 378,
	"./tl-ph": 379,
	"./tl-ph.js": 379,
	"./tlh": 380,
	"./tlh.js": 380,
	"./tr": 381,
	"./tr.js": 381,
	"./tzl": 382,
	"./tzl.js": 382,
	"./tzm": 383,
	"./tzm-latn": 384,
	"./tzm-latn.js": 384,
	"./tzm.js": 383,
	"./ug-cn": 385,
	"./ug-cn.js": 385,
	"./uk": 386,
	"./uk.js": 386,
	"./ur": 387,
	"./ur.js": 387,
	"./uz": 388,
	"./uz-latn": 389,
	"./uz-latn.js": 389,
	"./uz.js": 388,
	"./vi": 390,
	"./vi.js": 390,
	"./x-pseudo": 391,
	"./x-pseudo.js": 391,
	"./yo": 392,
	"./yo.js": 392,
	"./zh-cn": 393,
	"./zh-cn.js": 393,
	"./zh-hk": 394,
	"./zh-hk.js": 394,
	"./zh-tw": 395,
	"./zh-tw.js": 395
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 577;

/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, navParams, afAuth, fb, platform, auth) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.fb = fb;
        this.platform = platform;
        this.auth = auth;
        this.afAuth.authState.subscribe(function (user) {
            console.log(user);
            if (!user) {
                _this.user = null;
            }
            else {
                _this.user = user;
            }
        });
    }
    LoginPage.prototype.loginWithGG = function () {
        this.afAuth.auth.signInWithPopup(new __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].GoogleAuthProvider());
        __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]().getRedirectResult().then(function (authData) {
            //this.navCtrl.push(HomePage);
        }).catch(function (error) {
            console.log(error);
        });
        /*if(this.afAuth.auth.signInWithPopup) {
          this.goToListings();
        } else {
          this.goToLoginPage();
        }*/
    };
    /*
    goToListings(): void {
      this.navCtrl.push(HomePage);
    }
    goToLoginPage(): void {
      this.navCtrl.push(LoginPage);
    }
  
  
    logoutGG() {
      this.afAuth.auth.signOut();
    }
    // login with facebook
    loginWithFB() {
      this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider());
    }
    logoutFB() {
      this.afAuth.auth.signOut();
    }
  */
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.signInWithFacebook = function () {
        var _this = this;
        if (this.platform.is("cordova")) {
            return new Promise(function (resolve, reject) {
                _this.fb
                    .login(["public_profile", "user_friends", "email"])
                    .then(function (res) {
                    console.log("Logged into Facebook!", res);
                    __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"]()
                        .signInWithCredential(__WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].FacebookAuthProvider.credential(res.authResponse.accessToken))
                        .then(function (success) {
                        console.log("Firebase success", success);
                        resolve(true);
                    })
                        .catch(function (err) {
                        console.log("Firebase error", err);
                        reject(false);
                    });
                })
                    .catch(function (err) {
                    console.log("Error logging into Facebook", err);
                    reject(false);
                });
            });
        }
        else {
            return this.auth.auth
                .signInWithPopup(new __WEBPACK_IMPORTED_MODULE_3_firebase_app__["auth"].FacebookAuthProvider())
                .then(function (res) { return console.log(res); });
        }
    };
    /*
      signInWithGoogle() {
    
        if (this.platform.is("cordova")) {
          return new Promise((resolve, reject) => {
            this.googlePlus.login({})
              .then((res) => {
                console.log("Logged into Google!", res);
                firebase
                  .auth()
                  .signInWithCredential(
                    firebase.auth.GoogleAuthProvider.credential(null, res.accessToken)
                  )
                  .then(success => {
                    console.log("Google success", success);
                    resolve(true);
                  })
                  .catch(err => {
                    console.log("Google error", err);
                    reject(false);
                  });
              })
              .catch(err => {
                console.log("Error logging into Google", err);
                reject(false);
              });
          });
        }
        else {
          return this.auth.auth
            .signInWithPopup(new firebase.auth.GoogleAuthProvider())
            .then(res => console.log(res));
        }
      }
    */
    LoginPage.prototype.signOut = function () {
        this.auth.auth.signOut();
        //this.googlePlus.logout();
        this.fb.logout();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-login',template:/*ion-inline-start:"/Users/krittinj/Desktop/work/ite-rsu-sports/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n  <button ion-button menuToggle>\n  <ion-icon name="menu"></ion-icon>\n  </button>\n  <ion-title>Log in</ion-title>\n  </ion-navbar>\n  </ion-header>\n\n  <ion-content>\n\n\n        <button *ngIf="user == null" ion-button icon-left block clear (click)="signInWithFacebook()">\n          <ion-icon name="logo-facebook"></ion-icon>\n          Sign in with Facebook\n        </button>\n        <button *ngIf="user == null" ion-button icon-left block clear (click)="signInWithGoogle()">\n          <ion-icon name="logo-google"></ion-icon>\n          Sign in with Google\n        </button>\n\n        <p align="center" *ngIf="user != null">Welcome {{user.displayName}}\n          <br>\n          <span *ngIf="money"> Money: {{money}} </span>\n        </p>\n        <button *ngIf="user != null" ion-button icon-left block clear (click)="signOut()">\n          Sign Out\n        </button>\n\n  </ion-content>\n\n'/*ion-inline-end:"/Users/krittinj/Desktop/work/ite-rsu-sports/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2_angularfire2_auth__["a" /* AngularFireAuth */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[396]);
//# sourceMappingURL=main.js.map