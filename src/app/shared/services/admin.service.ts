import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ImageOUT } from '../interfaces/image';
import { IngredientOUT } from '../interfaces/ingredient';
import { MealIN, MealOUT } from '../interfaces/meal';
import { MenuIN, MenuOUT } from '../interfaces/menu';
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

saveMeals(meal: MealIN): any{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      headers,
      observe: 'response' as 'body' 
    };
    return (
      this.http.put<any>(`${this.baseUrl}/meal/add`, meal, options)
      .pipe(
        map((results) => {
          retry(3),
          catchError(this.handleError);
          return results;
        })
       )
    );
}

  saveMenus(menu: MenuIN): any{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const options = {
      headers,
      observe: 'response' as 'body' 
    };
    return (
      this.http.put<any>(`${this.baseUrl}/menu/add`, menu, options)
      .pipe(
        map((results) => {
          retry(3),
          catchError(this.handleError);
          return results;
        })
       )
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error(
        `A client-side or network error occurred: ${error.error.message} || `,
        error.error.message
      );
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}