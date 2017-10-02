import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { OrderService } from '../../../shared/services/order.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Order } from '../../../shared/models/order';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit,OnDestroy {
 @Input('cart') cart:ShoppingCart;
 shipping = {};
 userId: string;
 userSubscription: Subscription;

  constructor(private auth: AuthService,
              private route: Router,
              private orderService: OrderService) { }

  async placeOrder()  {
    let order =new Order(this.userId, this.shipping,this.cart )
    let result = await this.orderService.placeOrder(order);
    this.route.navigate(['order-success', result.key])
  }

  ngOnInit() {
        this.userSubscription =  this.auth.User$.subscribe(user => this.userId = user.uid);  

  }
   ngOnDestroy() {
  this.userSubscription.unsubscribe();
}

}
