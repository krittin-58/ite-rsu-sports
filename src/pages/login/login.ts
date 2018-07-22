import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AngularFireAuth } from"angularfire2/auth";
import * as firebase from "firebase/app";
import { HomePage } from '../home/home';
import { Facebook,FacebookLoginResponse} from '@ionic-native/facebook';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  user: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth,
    public fb: Facebook,
    public platform: Platform,
    public auth: AngularFireAuth
    ) {

      this.afAuth.authState.subscribe(user=> {
      console.log(user);
      if(!user) {
      this.user = null;
            }
      else {
      this.user = user;
            }
          });

  }

  loginWithGG() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    firebase.auth().getRedirectResult().then(function (authData) {
      //this.navCtrl.push(HomePage);

    }).catch(function (error) {
      console.log(error);
    });
    /*if(this.afAuth.auth.signInWithPopup) {
      this.goToListings();
    } else {
      this.goToLoginPage();
    }*/

  }
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');

  }

  signInWithFacebook() {
    if (this.platform.is("cordova")) {
      return new Promise((resolve, reject) => {
        this.fb
          .login(["public_profile", "user_friends", "email"])
          .then((res: FacebookLoginResponse) => {
            console.log("Logged into Facebook!", res);
            firebase
              .auth()
              .signInWithCredential(
                firebase.auth.FacebookAuthProvider.credential(
                  res.authResponse.accessToken
                )
              )
              .then(success => {
                console.log("Firebase success", success);
                resolve(true);
              })
              .catch(err => {
                console.log("Firebase error", err);
                reject(false);
              });
          })
          .catch(err => {
            console.log("Error logging into Facebook", err);
            reject(false);
          });
      });
    } else {

      return this.auth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(res => console.log(res));
    }

  }
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
  signOut() {
    this.auth.auth.signOut();
    //this.googlePlus.logout();
    this.fb.logout();
  }

}
