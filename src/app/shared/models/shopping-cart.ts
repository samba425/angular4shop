
import { products } from './product-model';
import { ShoppingCartItem } from './shopping-cart-item';


export class ShoppingCart {
    items: ShoppingCartItem[] = [];
    constructor(private itemsMap: { [productId: string] : ShoppingCartItem } ){
    this.itemsMap = itemsMap || {};
    for( let productId in itemsMap )
    {  
        let item = itemsMap[productId];  
        this.items.push(new ShoppingCartItem({ ...item, _id : item._id })); 
    } 
}


get totalPrice() {
    let sum = 0;
    for(let productId in this.items)
    sum += this.items[productId].totalPrice;
    return sum;

}

 getQuantity(product: products) { 
     console.log("new product list show1",product) 
     let item = this.itemsMap;
        for(let cart in item) { 
  if (item[cart]._id === product._id )  
     return item[cart].quantity ; 
  } 
 return 0; 
    //   return item ? item.quantity : 0; 
 }


get totalItemsCount() { 
     let count = 0;
       for(let productId in this.items){  
      count += this.items[productId].quantity; 
       }
       return count;
}
}