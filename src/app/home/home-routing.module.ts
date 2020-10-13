import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { MealsOfMenuComponent } from './orderable/meals-of-menu/meals-of-menu.component';
import { DessertsOfMenuComponent } from './orderable/desserts-of-menu/desserts-of-menu.component';
import { MealsComponent } from './orderable/meals/meals.component';

const routes: Routes = [
  {
    path: '', // /home
    children: [
      {
        path: '', // /home
        component: HomeComponent
      },
      {
        path: 'menu/:id/meals', // /home/menu/:id/meals
        component: MealsOfMenuComponent
      },
      {
        path: 'menu/:id/desserts', // /home/menu/:id/desserts
        component: DessertsOfMenuComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
