import { Component, OnInit } from '@angular/core';

import { MealService } from '../../../shared/services/meal.service';
import { OrderService } from '../../../shared/services/order.service';
import { AuthService } from '../../../shared/auth/auth.service';
import { ConstraintService } from '../../../shared/services/constraint.service';

import { MealOUT } from '../../../shared/interfaces/meal';
import { ImageOUT } from '../../../shared/interfaces/image';
import { OrderIN } from '../../../shared/interfaces/order';
import { QuantityIN, QuantityOUT } from '../../../shared/interfaces/quantity';
import { User /*UserOUT*/} from '../../../shared/interfaces/user';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  meals!: MealOUT[];
  mealsImages: ImageOUT[] = [];

  constructor(
    private mealService: MealService,
    private orderService: OrderService,
    private authService: AuthService) {}

  ngOnInit(): void {
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

  orderMaker(mealId: number): void {
    const user: User = this.authService.userLogged();
    if (user) {
      this.orderService.orderMaker(user.id, 'meal', mealId);
    }
  }

}
