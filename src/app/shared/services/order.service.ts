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
import { OrderOUT, OrderIN, PriceOUT } from '../interfaces/order';
import { QuantityIN, QuantityOUT } from '../interfaces/quantity';

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
    return (
      this.http
        .put<OrderOUT>(`${API_URL}/order/add`, order)
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

  makeOrder(orderId: number, constrainId: number): Observable<OrderOUT> {
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

  computePrice(orderId: number, constrainId: number): Observable<PriceOUT[]> {
    return (
      this.http
        .get<PriceOUT[]>(`${API_URL}/order/computeprice/${orderId}/${constrainId}`)
        .pipe(
          map((results) => {
            retry(3),
            catchError(this.handleError);
            console.log(results);
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

  addToOrder(
    orderToUpdateId: number,
    quantity: QuantityOUT[],
    userId: number,
    type: string,
    mealId?: number,
    menuId?: number): void {
    // On crée une variable newQuantity qui contiendra toutes nos quantités(repas/meanus)
    // de la commande plus la nouvelle
    const newQuantity: QuantityIN[] = [];

    // On parcours l'array contenant toutes les quantités(repas/meanus)
    // de la commande
    quantity.forEach(element => {
      // A chaque boucle,
      // on ajoute, à l'array newQuantity, les données qui nous intéressent
      newQuantity.push({
        quantity: element.quantity,
        mealId: element.meal ? element.meal.id : null,
        menuId: element.menu ? element.menu.id : null
      });
    });

    // Puis, on ajoute, à l'array newQuantity, notre nouvelle quantité
    newQuantity.push({
      quantity: 1,
      mealId: mealId ? mealId : null,
      menuId: menuId ? menuId : null
    });

    // Enfin, on ajoute toutes les quantités dans la variable updatedContent
    const updatedContent = {
      userId,
      constraintId: 2,
      quantity: newQuantity
    };

    this.update(orderToUpdateId, updatedContent).subscribe(
      () => {
        if (type === 'menu')
        {
          alert(`Menu ajouté au panier`);
        }
        else if (type === 'meal')
        {
          alert(`Plat ajouté au panier`);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createOrder(userId: number, type: string, mealId?: number, menuId?: number): void {
    const newQuantity: QuantityIN = {
      quantity: 1, // Dans la finalité nombre choisi par le User
      mealId: mealId ? mealId : null,
      menuId: menuId ? menuId : null
    };

    const order: OrderIN = {
      userId,
      constraintId: 2,
      quantity: [newQuantity],
    };

    this.add(order).subscribe(
      () => {
        if (type === 'menu')
        {
          alert(`Menu ajouté au panier`);
        }
        else if (type === 'meal')
        {
          alert(`Plat ajouté au panier`);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  orderMaker(userId: number, type: string, mealId?: number, menuId?: number): void {
    this.getOngoingOrdersOfUser(userId).subscribe(
      (order) => {
        if (typeof order === 'undefined' || order.length === 0) {
          this.createOrder(userId, type, mealId, menuId);
        } else {
          this.addToOrder(order[0].id, order[0].quantity, userId, type, mealId, menuId);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
