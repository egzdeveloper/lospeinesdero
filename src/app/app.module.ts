import { MbscModule } from '@mobiscroll/angular';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [
    MbscModule,
    FormsModule,BrowserModule, IonicModule.forRoot(), AppRoutingModule, SharedModule, provideFirebaseApp(() => initializeApp({"projectId":"los-peines-de-ro-app","appId":"1:382168494715:web:cc00747ea5d0d2bafda8de","storageBucket":"los-peines-de-ro-app.appspot.com","apiKey":"AIzaSyBtBul50QAvw5SI1vqz6rCB5WSfU195Mws","authDomain":"los-peines-de-ro-app.firebaseapp.com","messagingSenderId":"382168494715"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }],
  bootstrap: [AppComponent],
})
export class AppModule {}
