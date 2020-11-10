import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { ProfileComponent } from './profile/profile.component';
import { LoaderComponent } from './loader/loader.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';

import { OrderService } from './shared/services/order.service';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './shared/auth/auth.service';
export function tokenGetter(): string {
  return localStorage.getItem('jwt');
}

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    LoginComponent,
    RegisterComponent,
    ForgotComponent,
    LogoutComponent,
    ProfileComponent,
    LoaderComponent,
    NavBarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        allowedDomains: ['localhost:8080'],
        disallowedRoutes: []
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HomeModule,
    OrdersModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule
  ],
  providers: [
    AuthService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
