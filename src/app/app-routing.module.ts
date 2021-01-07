import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateComponent } from './template/template.component';
import { ForgotComponent } from './authentication/forgot/forgot.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { ManageAdminComponent } from './manage-admin/manage-admin.component';
import { IngredientComponent } from './ingredient/ingredient.component';
import { UserComponent } from './user/user.component';
import { UserAdminComponent } from './user-admin/user-admin.component';
import { NewmealComponent } from './newmeal/newmeal.component';
import { MenusComponent } from './menus/menus.component';
import { NewmenuComponent } from './newmenu/newmenu.component';
import { ManagerMenuComponent } from './manager-menu/manager-menu.component';

const routes: Routes = [
  {
    path:'admin/meals', 
    component: AdminComponent
  },
  {
    path:'admin/menus', 
    component: MenusComponent
  },
  {
    path:'admin/meal/:id',
    component: ManageAdminComponent 
  },
  {
    path:'admin/menu/:id',
    component: ManagerMenuComponent
  },
  {
    path:'admin/ingredients', 
    component: IngredientComponent
  },
  {
    path:'newmeal',
    component: NewmealComponent 
  },
  {
    path:'newmenu',
    component: NewmenuComponent 
  },
  {
    path:'admin/users', 
    component: UserComponent
  },
  {
    path:'user/:id',
    component: UserAdminComponent 
  },
  {
    path: 'login', // /login
    component: LoginComponent
  },
  {
    path: 'register', // /register
    component: RegisterComponent
  },
  {
    path: 'forgot', // /forgot
    component: ForgotComponent
  },
  {
    path: 'logout', // /logout
    component: LogoutComponent
  },
  {
    path: '', // /
    component: TemplateComponent,
    children: [
      {
        path: '', // /home <- Page par défaut
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home', // /home
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'orders', // /orders
        loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'profile', // /profile
        component: ProfileComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
