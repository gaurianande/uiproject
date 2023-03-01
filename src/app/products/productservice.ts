import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';
import { environment } from 'src/environments/environment';

export interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productURL = `${environment.apiUrl}/Product`; // URL to web api
  constructor(private http: HttpClient) { }

   getAllProducts(): Observable<Product[]> {
    console.log("GET");

    //let url = `assets/pizza.json`;
    // Add safe, URL encoded search parameter if there is a search term
    return this.http.get<Product[]>(this.productURL);
  }


  /** GET pizza by id. Will 404 if id not found */
  getProduct(id: number): Observable<Product> {
    const url = `${this.productURL}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }

  searchProduct(name: string): Observable<Product[]> {
    const url = `${this.productURL}/search/${name}`;
    return this.http.get<Product[]>(url);
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
       console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    console.error('PizzaService: ' + message);
  }
}