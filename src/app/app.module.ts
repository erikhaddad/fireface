import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {MaterialModule} from '@angular/material';
import 'hammerjs';
import {FlexLayoutModule} from "@angular/flex-layout";

import { AngularFireModule } from 'angularfire2';

import {AppComponent} from './app.component';

// Must export the config
export const firebaseConfig = {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        FlexLayoutModule.forRoot(),
        AngularFireModule.initializeApp(firebaseConfig)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
