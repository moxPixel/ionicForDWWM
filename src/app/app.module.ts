import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

const firebaseConfig = {
  apiKey: 'AIzaSyBZ0mffimf9pfhC8q03gMWmytloVYeM6V8',
  authDomain: 'airbnmap-91154.firebaseapp.com',
  databaseURL: 'https://airbnmap-91154-default-rtdb.firebaseio.com',
  projectId: 'airbnmap-91154',
  storageBucket: 'airbnmap-91154.appspot.com',
  messagingSenderId: '970770550135',
  appId: '1:970770550135:web:5c0a682f081ae5dbe66572',
  measurementId: 'G-RNH5YMC7Q3'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
            IonicModule.forRoot(),
            AppRoutingModule,
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireDatabaseModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
