import { OrderService } from '../../../shared/services/order.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
orders$;

  constructor(private auth: AuthService,
              private orderService: OrderService) {
    this.orders$ = auth.User$.switchMap(u => orderService.getOrderByUser(u.uid));
               }

  ngOnInit() {
  }

}
