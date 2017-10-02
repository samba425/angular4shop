import { products } from '../models/product-model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

async addToCart(product: products){
  this.updateItem(product,1);
}

async removeFromCart(product: products){
  this.updateItem(product,-1);
}

async clearCart(){
  let cardId = await this.getOrCreateCartById();
  this.db.object('/shopping-cart/' + cardId + '/items').remove();
}

async getCart(): Promise<Observable<ShoppingCart>>{
  let cartId = await this.getOrCreateCartById();
  return this.db.object('/shopping-cart/' + cartId)
  .map(x => new ShoppingCart(x.items));
}

getItem(cartId:string,productId: string) {
  return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
}

 private create() {
   return  this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
  });
}

private async getOrCreateCartById() :Promise<string> {
   let cartId = localStorage.getItem('cardId');
   if(cartId) return cartId;

     let result = await this.create();
     localStorage.setItem('cardId', result.key);
     return result.key;
 
}

async updateItem(product:products, change:number) {
let cartId = await this.getOrCreateCartById();
let item$ = this.getItem(cartId,product.$key);
  item$.take(1).subscribe(item => {
    let quantity = (item.quantity || 0)  + change;
    if(quantity === 0) item$.remove();
    else item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price:product.price,
         quantity: quantity });
  });
}

}
