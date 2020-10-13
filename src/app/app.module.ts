import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeModule } from './home/home.module';
import { OrdersModule } from './orders/orders.module';
import { HttpClientModule } from '@angular/common/http';

import { TemplateComponent } from './template/template.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { ForgotComponent } from './authentication/forgot/forgot.component';
import { LogoutComponent } from './authentication/logout/logout.component';
import { LoaderComponent } from './loader/loader.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';

import { OrderService } from './shared/services/order.service';
@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    LogoutComponent,
    LoaderComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    OrdersModule
  ],
  providers: [
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
