import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from '../orders/orders.component';

import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [OrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MatIconModule
  ]
})
export class OrdersModule { }
