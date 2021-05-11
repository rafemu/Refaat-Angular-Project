import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ICategories, Iproduct } from 'src/app/interfaces/products';
import { CategoriesService } from 'src/app/services/categories.service';
import { ProductsService } from 'src/app/services/products.service';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { MediaMatcher } from '@angular/cdk/layout';

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const CLIENT_DATA_LIMIT = 8;

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent implements OnInit {
  mobileQuery: MediaQueryList;
  minisidebar: boolean = true;
  sidebarOpened: any;
  public config: PerfectScrollbarConfigInterface = {};
  private _mobileQueryListener: () => void;
  public products: Array<Iproduct>;
  public editProduct: any;
  public categories: ICategories[] = [];
  public filteredProducts: any;
  public searchValue: string;
  public cartIsOpened: boolean;
  public addIsOpened: boolean;
  public editIsOpened: boolean;
  public from: number;
  public limit: number;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _productService: ProductsService,
    private _categoriesServer: CategoriesService
  ) {
    this.products = [];
    this.searchValue = '';
    this.cartIsOpened = true;
    this.addIsOpened = false;
    this.editIsOpened = false;
    this.limit = CLIENT_DATA_LIMIT;
    this.from = 0;
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }

  async prev() {
    if (this.from - this.limit < 0) return;
    this.from = this.from - this.limit;
    this.getProducts();
  }
  async next() {
    if (this.products.length < this.limit) return;
    this.from = this.from + this.limit;
    this.getProducts();
  }

  async addNewProduct(event: any) {
    console.log(event);
    const result = await this._productService.addNewProducts(event);
    if (result) this.getProducts();
  }

  openAdd() {
    this.addIsOpened = true;
    this.cartIsOpened = false;
    this.editIsOpened = false;
  }

  editProductFromStore(event: any) {
    console.log(event);
    this.editProduct = event;
    this.cartIsOpened = false;
    this.addIsOpened = true;
  }

  async editProductS(event: any) {
    const result = await this._productService.editProducts(event);
    if (result) this.getProducts();
  }
  async getProducts() {
    this.products = await this._productService.getProducts(
      this.from,
      this.limit
    );
    this.filteredProducts = this.products;
  }
  async getCategories() {
    this.categories = await this._categoriesServer.getCategories();
  }

  async deleteProductFromStore(event: any) {
    const result = await this._productService.deleteProductById(event);
    if (result) this.getProducts();
  }

  filterByCategoryParent(value: any, key: any) {
    console.log('v', value, 'key', key);
    const newPipe = new FilterPipe();
    this.filteredProducts = newPipe.transform(this.products, value, key);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
