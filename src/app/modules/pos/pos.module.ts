import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { POSRoutingModule } from './pos-routing.module';
import { PointOfSaleComponent } from './components/point-of-sale/point-of-sale.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule } from '@angular/forms';
import { ProductsGridComponent } from './components/products-grid/products-grid.component';
import { PosPaymentMethodButtonsComponent } from './components/pos-payment-method-buttons/pos-payment-method-buttons.component';
import { PosOrderTypeButtonsComponent } from './components/pos-order-type-buttons/pos-order-type-buttons.component';
import { PosOrderActionButtonsComponent } from './components/pos-order-action-buttons/pos-order-action-buttons.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomerInfoComponent } from './components/customer-info/customer-info.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    PointOfSaleComponent,
    CategoryComponent,
    ProductsGridComponent,
    PosPaymentMethodButtonsComponent,
    PosOrderTypeButtonsComponent,
    PosOrderActionButtonsComponent,
    ProductsComponent,
    CustomerInfoComponent
  ],
  imports: [
    CommonModule,
    POSRoutingModule,
    SharedModule,
    FormsModule,
    NgbModule
  ]
})
export class POSModule { }
