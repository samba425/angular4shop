import { Injectable } from '@angular/core';
import { Headers,Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs/Rx';
import { products } from '../models/product-model';
import { AngularFireDatabase } from 'angularfire2/database';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';
import { Observable } from 'rxjs/Observable'; 

@Injectable()
export class ShoppingCartService {
cartdeatils : Observable<ShoppingCart>

  constructor(private db: AngularFireDatabase, private _http : Http) { }
 

async addToCart(product: products){ 
   this.updateItem(product,1).then(x => {
  console.log("hello..1111",x)

 })
}

async removeFromCart(product: products){
  this.updateItem(product,-1)
}

async clearCart(){
  let cardId = await this.getOrCreateCartById();
  this.db.object('/shopping-cart/' + cardId + '/items').remove();
}

async getCart(): Promise<Observable<ShoppingCart>>{ 
  let cartId = await this.getOrCreateCartById();
  console.log("hello..3333",cartId)
  console.log("hello..2222")
  return this._http.get('http://localhost:3000/shoppingCart/' + cartId) 
  .do(x=> {
    console.log("hellow.................",x)
  })
  .map( (x) => new ShoppingCart(x.json().data[0].items))
 

}
 

 getItem(cartId:string,productId: string) { 
  return this._http.get('http://localhost:3000/shoppingCart/' + cartId + '/' + productId)
     .map((response: Response) => {  
       var filterdata = response.json().data; 
     if(filterdata.length == 0){ 
     return response.json().data ; 
    }  else { 
 return response.json().data[0].items[0]; 
     } 
   }) 
   .catch((err: Response) => Observable.throw(err)); 
}


 private create() { 
     const body = {
       dateCreated:  new Date().getTime()
   }
   const headers = new Headers({ 'Content-Type' : 'application/json'});
    return this._http.post('http://localhost:3000/shoppingCart', body, { headers: headers} ).subscribe(p => {
        console.log("daya", p.json().msg._id)
        var data =  p.json().msg._id;
          localStorage.setItem('cardId', data);
     return data;
   
    });
  
}
 

private async getOrCreateCartById() :Promise<string> {
   let cartId = localStorage.getItem('cardId');
   if(cartId) return cartId; 
     let result = await this.create(); 
 
} 
async updateItem(product:products, change:number) { 
let cartId = await this.getOrCreateCartById();
let item$ =   this.getItem(cartId,product._id) 
  item$.take(1).subscribe(params => {  
    let quantity = (params.quantity || 0)  + change; 
  if(params) { 
  const body = {
      title: product.title,
       imageUrl: product.imageUrl,
       price:product.price,
        quantity: quantity
   }
   console.log("quantity total", quantity)
   if(change === 1 && quantity === 1 ) {
     console.log("hello worild")
          const headers = new Headers({ 'Content-Type' : 'application/json'}); 
    return this._http.post('http://localhost:3000/addshoppingCart/' +  cartId + '/' + product._id , body, { headers: headers} ).subscribe(p => {
        console.log("daya122", p);  
    });
   } else if(change === -1 && params.quantity === 1 ) {
     console.log("i am here")
          const headers = new Headers({ 'Content-Type' : 'application/json'}); 
    return this._http.post('http://localhost:3000/removeshoppingCart/' +  cartId + '/' + product._id , body, { headers: headers} ).subscribe(p => {
        console.log("daya1", p);   
    });
   } else {
   const headers = new Headers({ 'Content-Type' : 'application/json'}); 
 this._http.post('http://localhost:3000/shoppingCart/' +  cartId + '/' + product._id , body, { headers: headers} ).subscribe(p => {
        console.log("daya999", p.json());    
        return this.cartdeatils =  p.json();    
    });} 
     }  
    });  
    
}


private messageSource = new BehaviorSubject<string>("");
 currentMessage = this.messageSource.asObservable();
    changeMessage(message: string) {
    this.messageSource.next(message);
  }
  
}

