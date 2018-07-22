import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from '@angular/forms';
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { DbManagementProvider } from "../providers/db-management/db-management";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { CountdownTimerModule } from 'ngx-countdown-timer';
//import * as moment from 'moment';

import { SportFilterPipe } from "../pipes/sport-filter/sport-filter";
import { MomentFilterPipe } from "../pipes/moment-filter/moment-filter";
import { LoginPage } from "../pages/login/login";
import { AngularFireAuth } from'angularfire2/auth';
import { Facebook } from "@ionic-native/facebook";






export const firebaseConfig = {
  apiKey: "firebase-api-key",
    authDomain: "xxxxxxxx",
    databaseURL: "xxxxxxxxxxx",
    projectId: "xxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxx"
};

@NgModule({
  declarations: [MyApp, HomePage,SportFilterPipe,MomentFilterPipe,LoginPage],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    CountdownTimerModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage,LoginPage],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DbManagementProvider,AngularFireAuth,Facebook
  ]
})
export class AppModule {}
