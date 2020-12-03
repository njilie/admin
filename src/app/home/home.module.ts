import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../home/home.component';
// import { DailyMenusComponent } from './daily-menus/daily-menus.component';
import { InfoComponent } from './info/info.component';
import { OrderableComponent } from './orderable/orderable.component';
import { WeeklyMenusComponent } from './orderable/weekly-menus/weekly-menus.component';
import { MealsComponent } from './orderable/meals/meals.component';
import { DessertsComponent } from './orderable/desserts/desserts.component';
import { MealsOfMenuComponent } from './orderable/meals-of-menu/meals-of-menu.component';
import { DessertsOfMenuComponent } from './orderable/desserts-of-menu/desserts-of-menu.component';

import { OrderService } from '../shared/services/order.service';

import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    HomeComponent,
    // DailyMenusComponent,
    InfoComponent,
    OrderableComponent,
    WeeklyMenusComponent,
    MealsComponent,
    DessertsComponent,
    MealsOfMenuComponent,
    DessertsOfMenuComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatTabsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [
    OrderService
  ]
})
export class HomeModule { }
