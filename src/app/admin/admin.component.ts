import { Component, OnInit, OnDestroy } from '@angular/core';
import { MealOUT } from '../shared/interfaces/meal';
import { AdminService } from '../shared/services/admin.service';
import { IngredientOUT } from '../shared/interfaces/ingredient';
import { UserOUT } from '../shared/interfaces/user';
import { User } from '../shared/interfaces/user';
import { ImageOUT } from '../shared/interfaces/image';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  meals: Array<MealOUT>;
  images: Array<ImageOUT>;
  ingredients: Array<IngredientOUT>;
  users: Array<UserOUT>
  meal: any;
  router: any;

  constructor(private adminService: AdminService) {
   }

  ngOnInit(): void {
    this.list();
    this.listImg();
  }

  list(): void{
    this.adminService.list()
    .subscribe((data: Array<MealOUT>) => {
      console.log(data)
      this.meals = data; 
    })
  }

  listIng(): void{
    this.adminService.listIng()
    .subscribe((data: Array<IngredientOUT>) => {
      console.log(data)
      this.ingredients = data; 
    })
  }

  listUser(): void{
    this.adminService.listUser()
    .subscribe((data: Array<UserOUT>) => {
      console.log(data)
      this.users = data; 
    })
  }



  listImg(): void{
    this.adminService.listImg()
    .subscribe((data: Array<ImageOUT>) => {
      console.log(data)
      this.images = data; 
    })
  }

  onDelete(id:number){
    this.adminService.delete(id).then(()=>{
      this.meals = this.meals.filter(meal=>meal.id!=id);
    })
  }
}