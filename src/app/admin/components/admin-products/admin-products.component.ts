import { products } from '../../../shared/models/product-model';
import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { DataTableResource } from "angular-4-data-table";

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
products: products[];
subscription: Subscription;
spinnerActive: boolean;
tableResource: DataTableResource<products>;
items: products[] =[];
itemCount: number;

  constructor(private productService: ProductService) {
    this.spinnerActive = true;
    setTimeout(()=> {
    this.spinnerActive = false;
   this.subscription = this.productService.getAllProducts()
        .subscribe(products => {
          this.products = products;
           this.initializeTable(products)
          
   }); 
    },2000)
    
   }

private initializeTable(products: products[]){
           this.tableResource = new DataTableResource(products);
           this.tableResource.query({offset: 0 })
           .then(items => this.items = items);
           this.tableResource.count()
            .then(count => this.itemCount = count );
}

reloadItems(params){
  if(!this.tableResource) return;
     this.tableResource.query(params)
           .then(items => this.items = items);
}
filter(query: string) {
  console.log("filter",query)
  let filterProducts = (query) ? 
  this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
    this.initializeTable(filterProducts);
}
 
  ngOnDestroy(){
         this.subscription.unsubscribe();
  }
 ngOnInit() {
  }
}
