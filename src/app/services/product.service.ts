import { Observable } from 'rxjs';
import { Endpoint } from '../core/enums/endpoint';
import { Product } from '../domain/product';
import { HttpService } from './../core/services/http.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpService = inject(HttpService);
  products: Product[] = [];

  getProductsData(): Observable<Product[]> {
    return this.httpService.get<Product[]>(Endpoint.GET_PRODUCTS);
  }

  // getProducts() {
  //   return Promise.resolve(this.getProductsData());
  // }

  // getProductsWithOrdersSmall() {
  //   return Promise.resolve(this.getProductsWithOrdersData().slice(0, 10));
  // }

  // getProductsWithOrders() {
  //   return Promise.resolve(this.getProductsWithOrdersData());
  // }
}
