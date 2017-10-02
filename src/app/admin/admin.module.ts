import { AuthGuard } from '../shared/services/auth-guard.service';
import { SharedModule } from '../shared/shared.module';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminAuthGuardService } from 'app/admin/services/admin-auth-guard.service';


@NgModule({
  imports: [
    SharedModule,
     RouterModule.forChild([
//admin users 
         { path:'admin/products/new',component: ProductFormComponent, canActivate : [AuthGuard, AdminAuthGuardService]  },
         { path:'admin/products/:id',component: ProductFormComponent, canActivate : [AuthGuard, AdminAuthGuardService]  },
         { path:'admin/products',component: AdminProductsComponent, canActivate : [AuthGuard, AdminAuthGuardService]  },
         { path:'admin/orders',component: AdminOrdersComponent, canActivate : [AuthGuard, AdminAuthGuardService]  }
    ])
  ],
  declarations: [

    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
    providers: [
    AdminAuthGuardService
  ],
})
export class AdminModule { }
