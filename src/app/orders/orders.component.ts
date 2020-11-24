import { Component, OnInit } from '@angular/core';
import { MealService } from '../shared/services/meal.service';
import { MenuService } from '../shared/services/menu.service';
import { OrderService } from '../shared/services/order.service';
import { User } from '../shared/interfaces/user';
import { Order } from '../shared/interfaces/order';
import { Quantity } from '../shared/interfaces/quantity';
import { Image } from '../shared/interfaces/image';
import { AuthService } from '../shared/auth/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  allOrdersUrl: string;
  user: User;
  orders: Order[];
  menusImages: Image[] = [];
  mealsImages: Image[] = [];

  constructor(
    private auth: AuthService,
    private orderService: OrderService,
    private menuService: MenuService,
    private mealService: MealService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.allOrdersUrl = this.route.snapshot.paramMap.get('all');

    this.user = this.auth.userLogged();
    if (this.user) {
      if (this.allOrdersUrl) {
        this.getAllOrdersOfUser(this.user.id);
      } else {
        this.getOngoingOrdersOfUser(this.user.id);
      }
    } else {
      console.log('VOUS DEVEZ ETRE CONNECTE');
    }
  }

  getOngoingOrdersOfUser(userId: number): void {
    this.orderService.getOngoingOrdersOfUser(userId).subscribe(
      (orders) => {
        this.orders = orders; console.log(this.orders);
        this.orders.forEach((order) => {
          // this.imageMenu(order.quantity);
          // this.imageMeal(order.quantity);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllOrdersOfUser(userId: number): void {
    this.orderService.getAllOrdersOfUser(userId).subscribe(
      (orders) => {
        this.orders = orders; console.log(this.orders);
        this.orders.forEach((order) => {
          // this.imageMenu(order.quantity);
          // this.imageMeal(order.quantity);
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  imageMenu(quantities: Quantity[]): void {
    quantities.forEach((quantity) => {
      this.menuService.getMenuImage(quantity.menu.imageId).subscribe(
        (image) => {
          this.menusImages.push(image);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  imageMeal(quantities: Quantity[]): void {
    quantities.forEach((quantity) => {
      this.mealService.getMealImage(quantity.meal.imageId).subscribe(
        (image) => {
          this.mealsImages.push(image);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

}
