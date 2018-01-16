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
    message: string;
async ngOnInit() {
    this.shoppingCartService.currentMessage.subscribe(message => {
      this.filters(message);
      this.message = message});
      
  this.cart$  = (await this.shoppingCartService.getCart());
  console.log("hello i am here",this.cart$)
  this.populateProducts();
  await this.shoppingCartService.getCart().then((x) => {
    console.log("sasgkaskags", x)
  })
}

 private populateProducts(){
     this.productService
    .getAllProducts()
    .switchMap(products => {
      console.log(products)
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


 filters(query: string) {
  this.filterProducts = (query) ? 
  this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  
}

}
