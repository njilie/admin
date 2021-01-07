import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { API_URL } from '../constants/api-url';

import { MenuOUT } from '../interfaces/menu';
import { ImageOUT } from '../interfaces/image';

import { handleError } from '../constants/handle-http-errors';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient, private auth: AuthService) {}

  getMenusForThisWeek(): Observable<MenuOUT[]> {
    return (
      this.http
        .get<MenuOUT[]>(`${API_URL}/menu/findallavailablefortoday`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }

  getMenu(menuId: number): Observable<MenuOUT> {
    return (
      this.http
        .get<MenuOUT>(`${API_URL}/menu/find/${menuId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }

  /*getMenuImage(menuId: number): Observable<ImageOUT> {
    return (
      this.http
        .get<ImageOUT>(`${API_URL}/menu/findimg/${menuId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }*/

  listMenu(): Observable<Array<MenuOUT>> {
    const url: string = `${API_URL}/menu/findall`;
    return this.http.get<Array<MenuOUT>>(url)
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
