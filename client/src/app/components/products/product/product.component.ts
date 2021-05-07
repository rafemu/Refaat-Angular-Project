import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() product: any;
  @Output() deleteProductEvent = new EventEmitter<string>();
  @Output() editProductEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {}
  deleteProducts(id: string) {
    this.deleteProductEvent.emit(id);
  }
  editProduct(product: any) {
    this.editProductEvent.emit(product);
  }
}
