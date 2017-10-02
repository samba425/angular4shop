import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { products } from 'shared/models/product-model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products :products[] = [];
filterProducts: products[] = [];
cart$: Observable<ShoppingCart>;
category: string; 

  constructor(private route: ActivatedRoute,
  private productService: ProductService,
  private shoppingCartService: ShoppingCartService) {

   
   }
 
async ngOnInit() {
  this.cart$  = (await this.shoppingCartService.getCart());
  this.populateProducts();
}

 private populateProducts(){
     this.productService
    .getAllProducts()
    .switchMap(products => {
       this.products = products;
       return this.route.queryParamMap;
   })
   .subscribe(params => {
      this.category = params.get('category');
      this.applyFilter();
    });
 }

 private applyFilter() {
     this.filterProducts = (this.category) ? 
      this.products.filter(p => p.category === this.category) :
      this.products; 
 }
}
