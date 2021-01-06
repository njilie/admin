import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ImageOUT } from '../interfaces/image';
import { IngredientOUT } from '../interfaces/ingredient';
import { MealIN, MealOUT } from '../interfaces/meal';
import { UserOUT } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  User() {
    throw new Error('Method not implemented.');
  }
  listUser() {
    const url: string = `${this.baseUrl}/user/findall`;
    return this.http.get<Array<UserOUT>>(url)
  }

  private baseUrl:string = `${environment.baseUrl}`;

  constructor(private http: HttpClient) { }

list(): Observable<Array<MealOUT>> {
  const url: string = `${this.baseUrl}/meal/findall`;
  return this.http.get<Array<MealOUT>>(url)
}

listIng(): Observable<Array<IngredientOUT>> {
  const url: string = `${this.baseUrl}/ingredient/findall`;
  return this.http.get<Array<IngredientOUT>>(url)
}


listImg(): Observable<Array<ImageOUT>> {
  const url: string = `${this.baseUrl}/meal/findimg`;
  return this.http.get<Array<ImageOUT>>(url)
}

get(id: number): Observable<any> {
  const url: string = `${this.baseUrl}/meal/find/${id}`;
  return this.http.get<any>(url);
}

update(id: number, meal: any): Observable<any> {
  const url: string = `${this.baseUrl}/meal/update/${id}`;
  return this.http.patch<any>(url, meal);
}

add(id:number, ingredient: any){
    const url: string = `${this.baseUrl}/ingredient/findall`;
    return this.http.get<Array<IngredientOUT>>(url)
}

delete(id: number): Promise<any> {
  return fetch(`${this.baseUrl}/meal​/delete​/{mealId}`, {
    method: 'DELETE'
  });
  }

  save(meal: MealIN){
    this.http.post(`${this.baseUrl}/meal/add`, meal).subscribe(console.log);
  }
}