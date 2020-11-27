import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, pipe, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

import { API_URL } from '../constants/api-url';

import { handleError } from '../constants/handle-http-errors';
import { OrderOUT, OrderIN } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  getTodayOrdersOfUser(userId: number): Observable<OrderOUT[]> {
    return (
      this.http
        .get<OrderOUT[]>(`${API_URL}/order/findallforusertoday/${userId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }

  getOngoingOrdersOfUser(userId: number): Observable<OrderOUT[]> {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('status', '0'); // status 1 (CREATED)

    return (
      this.http
        .get<OrderOUT[]>(`${API_URL}/order/findallforuser/${userId}`, { params })
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }

  getAllOrdersOfUser(userId: number): Observable<OrderOUT[]> {
    // let params = new HttpParams();
    // params = params.append('status', '1');

    return (
      this.http
        .get<OrderOUT[]>(`${API_URL}/order/findallforuser/${userId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }

  add(order: OrderIN): Observable<OrderOUT> {
    console.log(order);
    return (
      this.http
        .patch<OrderOUT>(`${API_URL}/order/add`, order)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }

  update(orderId: number, order: OrderIN): Observable<OrderOUT> {
    console.log(order);
    return (
      this.http
        .patch<OrderOUT>(`${API_URL}/order/update/${orderId}`, order)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }

  delete(orderId: number): Observable<OrderOUT> {
    return (
      this.http
        .patch<OrderOUT>(`${API_URL}/order/cancel/${orderId}`, {}) // <- (?_?)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            return results;
          })
        )
    );
  }

  payOrder(orderId: number, constrainId: number): Observable<OrderOUT> {
    return (
      this.http
        .patch<OrderOUT>(`${API_URL}/order/deliverandpay/${orderId}/${constrainId}`, {}) // <- (?_?)
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
