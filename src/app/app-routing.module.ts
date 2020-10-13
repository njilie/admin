import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TemplateComponent } from './template/template.component';
import { ForgotComponent } from './authentication/forgot/forgot.component';
import { LoginComponent } from './authentication/login/login.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { RegisterComponent } from './authentication/register/register.component';

const routes: Routes = [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
