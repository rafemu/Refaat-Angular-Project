import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseURL } from '.';

const categoris_PATTH = '/categories';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  async getCategories(): Promise<Array<any>> {
    return (await this.httpClient
      .get(`${BaseURL}${categoris_PATTH}`)
      .toPromise()) as Promise<Array<any>>;
  }
}
