import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MealsComponent } from './containers/meals/meals.component';
import { MealComponent } from './containers/meal/meal.component';
import { MealFormComponent } from './component/meal-form/meal-form.component';

export const ROUTES: Routes = [
    { path: '', component: MealsComponent},
    { path: 'new', component: MealComponent},
    { path: ':id', component: MealComponent}
];

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        RouterModule.forChild(ROUTES)
    ],
    declarations: [
        MealComponent,
        MealsComponent,
        MealFormComponent
    ],
    providers: []
})
export class MealsModule {}