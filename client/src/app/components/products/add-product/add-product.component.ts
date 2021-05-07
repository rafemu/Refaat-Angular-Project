import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ICategories, Iproduct } from 'src/app/interfaces/products';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnChanges {
  @Output() addNewProductEvent = new EventEmitter<Iproduct>();
  @Output() editProductEvent = new EventEmitter<Iproduct>();
  @Input() productDetials: any;
  public productForm: any;
  public categories: ICategories[];
  public selectedCategory: any;
  public buttonAction: string;
  constructor(
    private formBuilder: FormBuilder,
    private _categoriesServer: CategoriesService
  ) {
    this.categories = [];
    this.initForm();
    this.buttonAction = 'add';
  }
  async ngOnInit() {
    await this.getCategories();
    this.selectedCategory = this.categories;
  }

  ngOnChanges() {
    if (this.productDetials) {
      this.buttonAction = 'edit';
      this.selectedCategory = this.productDetials['categoryId']._id;
      this.productForm.setValue({
        name: this.productDetials['name'],
        categoryId: this.productDetials['categoryId'],
        description: this.productDetials['description'],
        price: this.productDetials['price'],
        picture: this.productDetials['picture'],
      });
    }
  }

  addnewProduct() {
    if (this.productForm.invalid) {
      return;
    }
    const newProduct: Iproduct = {
      _id: this.productDetials?._id,
      name: this.productForm.value.name,
      categoryId: this.productForm.value.categoryId,
      description: this.productForm.value.description,
      price: this.productForm.value.price,
      picture: this.productForm.value.picture,
    };

    this.productDetials === undefined ? delete newProduct._id : newProduct;

    this.productDetials
      ? this.editProductEvent.emit(newProduct)
      : this.addNewProductEvent.emit(newProduct);
  }

  initForm() {
    this.productForm = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(1),
      ]),
      categoryId: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.maxLength(250),
        Validators.minLength(2),
      ]),
      price: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(1),
      ]),
      picture: new FormControl('', [Validators.required]),
    });
  }

  initEditForm() {}

  async getCategories() {
    this.categories = await this._categoriesServer.getCategories();
  }
}
