import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { 
   }

 createProduct(product) {
    return this.db.list('/products').push(product);
 }

 getAllProducts() {
   return this.db.list('/products');
 }

 get(productId) {
   return this.db.object('/products/' + productId);
 }

 update(productId,product){
     return this.db.object('/products/' + productId).update(product);
 }

 delete(productId){
   console.log(productId)
   return this.db.object('/products/' + productId).remove();
 }
}
