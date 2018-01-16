import { ContentType } from '@angular/http/src/enums';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Http, Headers,Response } from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { products } from '../models/product-model';

@Injectable()
export class ProductService {

  constructor(private http: Http, private db: AngularFireDatabase) { 
   }

 createProduct(product) { 
   const body = JSON.stringify(product)
   const headers = new Headers({ 'Content-Type' : 'application/json'});
    return this.http.post('http://localhost:3000/products', body, { headers: headers} ).subscribe(p => {
      console.log('p',p)
    });
 } 
 getAllProducts() {
  //  return this.db.list('/products');
  return  this.http.get('http://localhost:3000/products')
   .map((response: Response) => {  
      return response.json().data; 
   }) 
   .catch((err: Response) => Observable.throw(err));
 }

 get(productId) {
   return this.db.object('/products/' + productId);
 }

 update(productId,product){
 }

 delete(productId){
   console.log(productId)
   return this.db.object('/products/' + productId).remove();
 }
}
