import { Component, OnInit } from '@angular/core';
import { MealService } from '../../../shared/services/meal.service';
import { Meal } from '../../../shared/interfaces/meal';
import { Image } from '../../../shared/interfaces/image';

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {

  meals!: Meal[];
  mealsImages: Image[] = [];

  constructor(private mealService: MealService) {}

  ngOnInit(): void {
    this.getMealsForThisWeek();
  }

  getMealsForThisWeek(): void {
    this.mealService.getMealsForThisWeek().subscribe(
      (meals) => {
        this.meals = meals;
        this.meals.forEach((meal) => {
          this.mealService.getMealImage(meal.imageId).subscribe(
            (image) => {
              this.mealsImages.push(image);
            },
            (error) => {
              console.log(error);
            }
          );
        });
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
