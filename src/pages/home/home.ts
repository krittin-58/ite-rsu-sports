import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

import { DbManagementProvider } from "../../providers/db-management/db-management";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";

import { Observable } from "rxjs/Observable";
//import * as firebase from 'firebase'
import { AngularFireStorage } from "angularfire2/storage";
import { LoginPage } from "../login/login";
//import { map } from 'rxjs/operators';

//import { CountdownTimerModule } from 'ngx-countdown-timer';
//import * as moment from 'moment';
import * as firebase from "firebase/app";
import { AngularFireAuth } from"angularfire2/auth";




interface Items {}
interface Item {
  //name: any;
}



@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  url: any;
  beverage: any;
  tmp: any;
  form: any;
  action: any;

  file: any;
  photo: any;

  photoforupdate: any;
  user:any;

  //private _facultyListRef = this.afs.doc('listings/listingsOverview').collection('faculty');
  //private _branchListRef = this.afs.doc('listings/listingsOverview').collection('branch');
  //private _listingsListRef = this.afs.doc('listings/listingsOverview').collection('listings');
  //private _sportsListRef = this.afs.doc('listings/listingsOverview').collection('sports');

  facultyCollection: AngularFirestoreCollection<Items>; //Firestore collection
  faculty: Observable<Items[]>; // read collection
  facultyDoc: AngularFirestoreDocument<Item>;
  facDoc: Observable<Item>;


  getFacultyFireStore() {
    this.facultyCollection = this.afs.collection("faculty");
    // this.items = this.itemsCollection.valueChanges();
    this.faculty = this.facultyCollection.snapshotChanges().map(actions => {
      return actions.map(action => ({
        $key: action.payload.doc.id,
        ...action.payload.doc.data()
      }));
    });
    console.log(this.faculty);
  }


  /*getFacultyFireStore() {
    this.facultyCollection = this.afs.doc('listings/listingsOverview').collection('faculty');
    return this.facultyCollection.snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            return { id: a.payload.doc.id, ...a.payload.doc.data() }
          })
        })
      )
  } */
/* branch
  branchCollection: AngularFirestoreCollection<Items>; //Firestore collection
  branch: Observable<Items[]>; // read collection
  branchDoc: AngularFirestoreDocument<Item>;
  _branchDoc: Observable<Item>;


  getBranchFireStore() {
    this.branchCollection = this.afs.collection("branch");
    //this.branch = this.branchCollection.valueChanges();
    this.branch = this.branchCollection.snapshotChanges().map(actions => {
      return actions.map(action => ({
        $key: action.payload.doc.id,
        ...action.payload.doc.data()
      }));
    });
    console.log(this.branch);
  }
  */

  listingsCollection: AngularFirestoreCollection<Items>;
  listings: Observable<Items[]>;
  listingsDoc: AngularFirestoreDocument<Item>;
  listDoc: Observable<Item>;

  getListingsFireStore() {
    this.listingsCollection = this.afs.collection("listings");
    this.listings = this.listingsCollection.snapshotChanges().map(actions => {
      return actions.map(action => ({
        $key: action.payload.doc.id,
        ...action.payload.doc.data()
      }));
    });
    console.log(this.listings);
  }


/* From ITE465 Class */
  itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
  items: Observable<Items[]>; // read collection

  editCollection: AngularFirestoreCollection<Items>; //Firestore collection
  editItems: Observable<Items[]>; // read collection

  itemDoc: AngularFirestoreDocument<Item>;
  item: Observable<Item>;





  constructor(
    public navCtrl: NavController,
    public db: DbManagementProvider,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public storage: AngularFireStorage
  ) {
    //this.url = "http://localhost/api/dboperation.php";
    this.getFacultyFireStore();
    //this.getBranchFireStore();
    this.getListingsFireStore()
    this.getFacultyListFireStore();
    //this.getBranchListFireStore();
    this.getSportsList();
    this.getStatusList();
    this.tmp = {};
    this.form = "hide";



  }

  sports: any;
  somesports:any;
  searchText:any;

  loginWithGG() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    firebase.auth().getRedirectResult().then(function (authData) {
      this.navCtrl.push(HomePage);

    }).catch(function (error) {
      console.log(error);
    });
    /*if(this.afAuth.auth.signInWithPopup) {
      this.goToListings();
    } else {
      this.goToLoginPage();
    }*/

  }
  logoutGG() {
    this.afAuth.auth.signOut();
  }

  goToLoginPage(): void {
    this.navCtrl.push(LoginPage);
  }

  searchItems(ev: any) {
    let val = ev.target.value;
    let filterd;
    filterd = this.sports.filter(item=> {
    return (
    item.firstname.toLowerCase().indexOf(val.toLowerCase()) > -1 ||
    item.lastname.toLowerCase().indexOf(val.toLowerCase()) > -1
          );
        });
    this.somesports = filterd;
      }


// faculty //
  facultyOperation(tmp, action) {
    if (action == "add") {
      var timestamp = new Date().getUTCMilliseconds();
      tmp.id = timestamp;
      let tmpCollection = this.afs.collection<Item>("faculty");
      tmpCollection
        .add(tmp)
        .then(added => {
          console.log(added.id);
          this.tmp = {};
          this.form = "hide";
        })
        .catch(e => {
          console.log("Error", e);
        });
    } else if (action == "delete") {
      console.log(tmp.$key);
      var r = confirm("Confirm to Delete Item ID = " + tmp.$key);
      if (r == true) {
        this.facultyCollection.doc(tmp.$key).delete();
        //this.storage.storage.refFromURL(tmp.photo).delete();
      }
    } else if (action == "edit") {


      this.facultyCollection = this.afs.collection("faculty", ref => ref.where("id", "==", tmp.id));
      this.editItems = this.facultyCollection.snapshotChanges().map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
      this.editItems.forEach(element => {
        console.log(element);
        this.tmp = element[0];
        //this.photoforupdate = this.tmp.photo;
      });

      this.form = "edit";
    } else if (action == "update") {
      this.facultyDoc = this.afs.doc<Item>("faculty/" + tmp.$key);
      this.facDoc = this.facultyDoc.valueChanges();
      this.facultyDoc.update(tmp);
      //this.storage.storage.refFromURL(this.photoforupdate).delete();
      this.tmp = {};
      this.form = "hide";
    }
  }



  listingsOperation(tmp, action) {
    if (action == "add") {
      var timestamp = new Date().getUTCMilliseconds();
      tmp.id = timestamp;
      let tmpCollection = this.afs.collection("listings");
      tmpCollection
        .add(tmp)
        .then(added => {
          console.log(added.id);
          this.tmp = {};
          this.form = "hide";
        })
        .catch(e => {
          console.log("Error", e);
        });
    } else if (action == "delete") {
      console.log(tmp.$key);
      var r = confirm("Confirm to Delete Item ID = " + tmp.$key);
      if (r == true) {
        this.listingsCollection.doc(tmp.$key).delete();
        //this.storage.storage.refFromURL(tmp.photo).delete();
      }
    } else if (action == "edit") {

      this.listingsCollection = this.afs.collection("listings", ref =>
        ref.where("id", "==", tmp.id));

      this.listings = this.listingsCollection.snapshotChanges().map(actions => {
        return actions.map(action => ({
          $key: action.payload.doc.id,
          ...action.payload.doc.data()
        }));
      });
      this.listings.forEach(element => {
        console.log(element);
        this.tmp = element[0];

      });

      this.form = "edit";
    } else if (action == "update") {
      this.listingsDoc = this.afs.doc<Item>("listings/" + tmp.$key);
      this.listDoc = this.listingsDoc.valueChanges();
      this.listingsDoc.update(tmp);

      this.tmp = {};
      this.form = "hide";
    }
  }

  wantToAdd() {
    this.form = "add";
    this.tmp = {};

  }


/*
  getTypeName(facultyId) {
    let x = this.facultyAdd.filter(item => {
      return item.id == facultyId;
    });
    return x[0].name;
  } */

  facultyAddList: AngularFirestoreCollection<Items>; //Firestore collection
  facultyAdd: any;

  getFacultyListFireStore() {
    this.facultyAddList = this.afs.collection("faculty");
    //this.facultyAdd = this.facultyAddList.valueChanges();
    this.facultyAdd = this.facultyAddList.snapshotChanges().map(actions => {
      return actions.map(action => ({
        $key: action.payload.doc.id,
        ...action.payload.doc.data()
      }));
    });
    console.log(this.facultyAdd);
  }

  sportAddList: AngularFirestoreCollection<Items>;
  sportAdd: any;

  getSportsList() {
    this.sportAddList = this.afs.collection("sports");
    //this.sportAdd = this.sportAddList.valueChanges();
    this.sportAdd = this.sportAddList.snapshotChanges().map(actions => {
      return actions.map(action => ({
        $key: action.payload.doc.id,
        ...action.payload.doc.data()
      }));
    });
    console.log(this.sportAdd);
  }

  statusAddList: AngularFirestoreCollection<Items>;
  statusAdd: any;

  getStatusList() {
    this.statusAddList = this.afs.collection("status");
    //this.statusAdd = this.statusAddList.valueChanges();
    this.statusAdd = this.statusAddList.snapshotChanges().map(actions => {
      return actions.map(action => ({
        $key: action.payload.doc.id,
        ...action.payload.doc.data()
      }));
    });
    console.log(this.statusAdd);
  }
}
