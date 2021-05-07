import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '.';
import { Iproduct } from '../interfaces/products';

const products_PATH = '/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  async getProducts(from?: any, limit?: number): Promise<Array<any>> {
    const queryParams =
      from >= 0 && limit ? `?from=${from}&limit=${limit}` : '';

    return (await this.httpClient
      .get(`${BaseURL}${products_PATH}${queryParams}`)
      .toPromise()) as Promise<Array<any>>;
  }

  addNewProducts(product: Iproduct): Promise<Array<any>> {
    console.log(product);
    return this.httpClient
      .post(`${BaseURL}${products_PATH}`, product)
      .toPromise() as Promise<Array<any>>;
  }

  editProducts(product: Iproduct): Promise<Array<any>> {
    console.log(product._id);
    console.log(product);
    return this.httpClient
      .put(`${BaseURL}${products_PATH}/${product._id}`, product)
      .toPromise() as Promise<Array<any>>;
  }

  deleteProductById(id: string): Promise<Array<any>> {
    return this.httpClient
      .delete(`${BaseURL}${products_PATH}/${id}`)
      .toPromise() as Promise<Array<any>>;
  }
}
