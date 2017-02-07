import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {MaterialModule} from '@angular/material';
import {FlexLayoutModule} from "@angular/flex-layout";

import {AuthGuard} from '../auth/auth.module';

import {CreateComponent} from './create.component';
import {AvatarService} from '../common/avatar.service';

const routes: Routes = [
    {path: 'create', component: CreateComponent, canActivate: [AuthGuard]}
];

@NgModule({
    declarations: [
        CreateComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule.forRoot(),
        FlexLayoutModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    providers: [
        AvatarService
    ]
})

export class CreateModule {
}

export {AvatarService};
