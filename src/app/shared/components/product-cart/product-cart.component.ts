import { ShoppingCart } from '../../models/shopping-cart';
import { products } from '../../models/product-model';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent {

@Input('product') product;
@Input('show-action') showAction= true;
@Input('shopping-cart') shoppingCart: ShoppingCart;


  constructor(private cartService: ShoppingCartService) { }

 addToCart() {
   this.cartService.addToCart(this.product)
 }
 
}
