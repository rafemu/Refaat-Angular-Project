import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Iproduct } from 'src/app/interfaces/products';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent implements OnInit {
  @Output() actionEvent = new EventEmitter<any>();
  public products: Array<Iproduct>;

  constructor(private _productService: ProductsService) {
    this.products = [];
  }

  ngOnInit(): void {}
  async addNewProduct(event: any) {
    this.actionEvent.emit(event);
  }
}
