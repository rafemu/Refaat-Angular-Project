import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ICategories } from 'src/app/interfaces/products';

@Component({
  selector: 'app-filter-categories',
  templateUrl: './filter-categories.component.html',
  styleUrls: ['./filter-categories.component.css'],
})
export class FilterCategoriesComponent implements OnInit {
  @Input() categories: any;
  @Output() filterByCategoryEvent = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  filterByCategory(id: string) {
    this.filterByCategoryEvent.emit(id);
  }
}
