import { products } from '../models/product-model';


export class ShoppingCartItem {
    $key: string;
    title: string;
    price:number;
    imageUrl: string;
    quantity: number;

 constructor(init?: Partial<ShoppingCartItem> ){
     Object.assign(this,init);

 }

    get totalPrice() { return this.price * this.quantity }
}