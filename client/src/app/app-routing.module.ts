import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullComponent } from './components/layouts/full/full.component';
import { ProductsPageComponent } from './components/products/products-page/products-page.component';

const routes: Routes = [{ path: '', component: ProductsPageComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
