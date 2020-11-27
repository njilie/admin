import { Component, OnInit } from '@angular/core';

import { MealService } from '../../../shared/services/meal.service';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/auth/auth.service';
import { ConstraintService } from '../../../shared/services/constraint.service';

import { MealOUT } from '../../../shared/interfaces/meal';
import { ImageOUT } from '../../../shared/interfaces/image';
import { OrderIN } from '../../../shared/interfaces/order';
import { QuantityIN } from '../../../shared/interfaces/quantity';
import { User /*UserOUT*/ } from '../../../shared/interfaces/user';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  user: User /*UserOUT*/;
  meals!: MealOUT[];
  mealsImages: ImageOUT[] = [];

  constructor(
    private mealService: MealService,
    private oderService: OrderService,
    private authService: AuthService
    /*private constraintService: ConstraintService*/) {}

  ngOnInit(): void {
    this.user = this.authService.userLogged();

    this.getMealsForThisWeek();
  }

  getMealsForThisWeek(): void {
    this.mealService.getMealsForThisWeek().subscribe(
      (meals) => {
        this.meals = meals;
        // this.meals.forEach((meal) => {
        //   this.mealService.getMealImage(meal.imageId).subscribe(
        //     (image) => {
        //       this.mealsImages.push(image);
        //     },
        //     (error) => {
        //       console.log(error);
        //     }
        //   );
        // });
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addToOrder(orderToUpdateId: number, quantity: QuantityIN[], mealId: number): void {
    const newQuantity: QuantityIN = {
      quantity: 1, // Dans la finalité nombre choisi par le User
      mealId
    };

    quantity.push(newQuantity);

    const updatedContent = {
      userId: this.user.id,
      constraintId: 2,
      quantity
    };

    this.oderService.update(orderToUpdateId, updatedContent).subscribe(
      (data) => {console.log(data); },
      (error) => {
        console.log(error);
      }
    );
  }

  createOrder(mealId: number): void {
    // this.constraintService.constraint(1).subscribe(
    //   (constraint) => {

    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    const quantity: QuantityIN = {
      quantity: 1, // Dans la finalité nombre choisi par le User
      mealId
    };

    const order: OrderIN = {
      userId: this.user.id,
      constraintId: 2,
      quantity: [quantity],
    };

    this.oderService.add(order).subscribe(
      () => {},
      (error) => {
        console.log(error);
      }
    );
  }

  makeOrder(mealId: number): void {
    if (this.user) {
      this.oderService.getOngoingOrdersOfUser(this.user.id).subscribe(
        (order) => {
          if (order) {
            this.addToOrder(order[0].id, order[0].quantity, mealId);
          } else {
            this.createOrder(mealId);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

}
