import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from '../orders/orders.component';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatIconModule,
    MatProgressBarModule,
    MatSnackBarModule
  ]
})
export class OrdersModule { }
