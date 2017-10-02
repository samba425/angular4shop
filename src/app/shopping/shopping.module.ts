import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './../shared/services/auth-guard.service';
import { RouterModule } from '@angular/router';
import { ShoppingCartComponent } from '../shared/components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import { ShoppingCartSummeryComponent } from './components/shopping-cart-summery/shopping-cart-summery.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
  //anonumous Users
      { path:'products',component: ProductsComponent },
      { path:'shopping-cart',component: ShoppingCartComponent },
//login users
      { path:'check-out',component: CheckOutComponent, canActivate : [AuthGuard] },
      { path:'order-success/:id',component: OrderSuccessComponent, canActivate : [AuthGuard] },
      { path:'my/orders',component: MyOrdersComponent, canActivate : [AuthGuard]  },
])
  ],
  declarations: [
      OrderSuccessComponent,
      ShoppingCartComponent,
      ShoppingCartSummeryComponent,
      ProductFilterComponent,
      ProductsComponent,
      MyOrdersComponent,
      CheckOutComponent,
      ShippingFormComponent
  ]
})
export class ShoppingModule { }
