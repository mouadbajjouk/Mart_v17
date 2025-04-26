import { Product } from './../domain/product';
import { Observable } from 'rxjs';
import { Endpoint } from '../core/enums/endpoint';
import { HttpService } from './../core/services/http.service';
import { inject, Injectable } from '@angular/core';
import { Enum } from '../domain/enum';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  httpService = inject(HttpService);
  products: Product[] = [];

  getProductsData(): Observable<Product[]> {
    return this.httpService.get<Product[]>(Endpoint.GET_PRODUCTS);
  }

  addProduct(product: Product): Observable<Product> {
    // TODO: ADD AUTH !!!!
    let formData = this.GetProductFormData(product);

    return this.httpService.post(Endpoint.ADD_PRODUCT, formData);
  }

  editProduct(product: Product): Observable<Product> {
    // TODO: ADD AUTH !!!!
    let formData = this.GetProductFormData(product);

    return this.httpService.patch(Endpoint.EDIT_PRODUCT, formData);
  }

  private GetProductFormData(product: Product) {
    let formData = new FormData();

    if (product.id) formData.append('id', product.id);
    if (product.name) formData.append('name', product.name);
    if (product.categoryId)
      formData.append('categoryId', product.categoryId.toString());
    if (product.price !== undefined && product.price !== null)
      formData.append('price', product.price.toString());
    if (product.description)
      formData.append('description', product.description);
    if (product.quantity !== undefined && product.quantity !== null)
      formData.append('quantity', product.quantity.toString());
    if (product.sku) formData.append('sku', product.sku);
    if (product.barCode) formData.append('barCode', product.barCode);

    // Append each file individually
    if (product.imageFiles) {
      product.imageFiles.forEach((file, index) => {
        if (file instanceof File) {
          formData.append('imageFiles', file, file.name); // key must match parameter name in C#
        }
      });
    }
    return formData;
  }

  getCategories() {
    return this.httpService.get<Enum[]>(Endpoint.GET_CATEGORIES);
  }

  deleteProduct(id: string) {
    return this.httpService.deleteUsingQuery<boolean>(
      Endpoint.DELETE_PRODUCT,
      '/' + id
    );
  }

  deleteProducts(ids: string[]) {
    return this.httpService.delete<boolean>(Endpoint.DELETE_PRODUCT, {
      body: { ids },
    });
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
