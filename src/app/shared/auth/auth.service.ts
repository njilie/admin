import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { API_URL } from '../constants/api-url';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private jwtHelper: JwtHelperService,
    private router: Router,
    private http: HttpClient) { }

    login(credentials: any): void {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const options = {
        headers
      };

      this.http.post<any>(`${API_URL}/login`, credentials, options)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            localStorage.setItem('jwt', results.headers.get('Authorization'));
          })
        );
    }

    canActivate(): boolean {
      // On récupère le token
      const token = localStorage.getItem('jwt');
      // S'il existe est n'est pas expiré la méthode return true
      if (token && !this.jwtHelper.isTokenExpired(token)){
        console.log(this.jwtHelper.decodeToken(token));
        return true;
      }
      // Donc si la méthode elle n'a pas return true on continue et on redirige vers la page d'accueil
      // Et cette fois on return false
      this.router.navigate(['/']);
      return false;
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

    // tokenGetter(): string {
    //   return localStorage.getItem('jwt');
    // }
}
