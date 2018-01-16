import { products } from '../../../shared/models/product-model';
import { Component, Input } from '@angular/core';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { ShoppingCart } from 'shared/models/shopping-cart';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
cart$  : Observable<ShoppingCart>
cartitems;
@Input('product') product: products;
@Input('shopping-cart') shoppingCart;
  constructor(private cartService: ShoppingCartService) { 
    
  }

async addToCart() {
  await  this.cartService.addToCart(this.product); 
   (await this.cartService.getCart()).subscribe( x => {
        
  console.log("hsssssssssssss",x.totalPrice) 
 this.cartitems = x.getQuantity(this.product); 
  console.log("hsssssssssssss11",this.cartitems )  
  })
 
 }

 async removeFromCart(){
  this.cartService.removeFromCart(this.product); 
   (await this.cartService.getCart()).subscribe( x => {
         
 this.cartitems = x.getQuantity(this.product); 
  console.log("hsssssssssssss11",this.cartitems )  
  })
 } 

  async ngOnInit() {
        (await this.cartService.getCart()).subscribe( x => {
        
  console.log("hsssssssssssss",x.totalPrice) 
  this.cartitems = x.getQuantity(this.product); 
  console.log("hsssssssssssss11",x.totalItemsCount)  
  }) 
    
}

}
