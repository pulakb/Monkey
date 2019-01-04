import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//third-party modules
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { SharedModule } from './shared/shared.module';

export const ROUTES: Routes = [
    {
        path: 'auth',
        children: [
            { path:'', pathMatch: 'full', redirectTo: 'login'},
            { path:'login', loadChildren: './login/login.module#LoginModule'},
            { path:'register', loadChildren: './register/register.module#RegisterModule'},
        ]
    }
];

export const config: FirebaseAppConfig = {
    apiKey: "AIzaSyB4UF9NBpZoVPvmZul9dgsMMV1lODVLvjE",
    authDomain: "fitness-app-1994d.firebaseapp.com",
    databaseURL: "https://fitness-app-1994d.firebaseio.com",
    projectId: "fitness-app-1994d",
    storageBucket: "fitness-app-1994d.appspot.com",
    messagingSenderId: "662635720028"
    };

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        AngularFireModule.initializeApp(config),
        AngularFireAuthModule,
        AngularFireDatabaseModule,
        SharedModule.forRoot()
    ],
    declarations: [],
    providers: []
})
export class AuthModule {}