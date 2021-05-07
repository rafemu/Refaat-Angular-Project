import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(products: Array<any>, ...args: any[]): any {
    const [value, key] = args;
    if (!value) return products;
    const filteredProducts = products.filter((item) => {
      let filterBy = key == '_id' ? item['categoryId']._id : item[key];
      return filterBy.toString().includes(value);
    });
    return filteredProducts;
  }
}
