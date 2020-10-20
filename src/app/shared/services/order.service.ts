import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { API_URL } from '../constants/api-url';

import { Menu } from '../interfaces/menu';
import { Image } from '../interfaces/image';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  // Cette fonction retourne un Observable
  // Un Observable est un objet permettant de faire le “lien” entre des publishers et des subscribers
  // Il permet d'executer le code de manière asynchrone c'est-à-dire,
  // exemple, que la page d'un site n'attendra pas qu'une données soit chargée pour afficher les éléments du site ;
  // elle le fera en parallèle
  getMenusForThisWeek(): Observable<Menu[]> {
    return (
      this.http
        .get<Menu[]>(`${API_URL}/menu/findallavailablefortoday`)
        // L'opérateur map permet de créer un nouvel Observable à partir de l'Observable d'origine
        // Il prend les valeurs en entrée, les transforme et les renvoie en sortie
        .pipe(
          map((results) => {
            retry(3), // retry a failed request up to 3 times
            catchError(this.handleError); // then handle the error
            return results;
          })
        )
    );
  }

  getMenu(menuId: number): Observable<Menu> {
    return (
      this.http
        .get<Menu>(`${API_URL}/menu/find/${menuId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }

  getMenuImage(menuId: number): Observable<Image> {
    return (
      this.http
        .get<Image>(`${API_URL}/menu/findimg/${menuId}`)
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

  // private handleError(error: HttpErrorResponse): Observable<never> {
  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     console.error(
  //       'A client-side or network error occurred:',
  //       error.error.message
  //     );
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     console.error(
  //       `Backend returned code ${error.status}, ` + `body was: ${error.error}`
  //     );
  //   }

  //   // return an observable with a user-facing error message
  //   return throwError('Something bad happened; please try again later.');
  // }
}
