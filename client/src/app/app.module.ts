import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsPageComponent } from './components/products/products-page/products-page.component';
import { ProductComponent } from './components/products/product/product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { AddProductComponent } from './components/products/add-product/add-product.component';
import { MaterialModule } from './material-module';
import { HeaderComponent } from './components/layouts/header/header.component';
import { SideBarComponent } from './components/layouts/side-bar/side-bar.component';
import { FullComponent } from './components/layouts/full/full.component';
import { FilterCategoriesComponent } from './components/products/filter-categories/filter-categories.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterPipe } from './pipes/filter.pipe';
import { CartComponent } from './components/cart/cart.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
@NgModule({
  declarations: [
    AppComponent,
    ProductsPageComponent,
    ProductComponent,
    AddProductComponent,
    HeaderComponent,
    SideBarComponent,
    FullComponent,
    FilterCategoriesComponent,
    FilterPipe,
    CartComponent,
    EditProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
