import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { UserModal } from '../../../shared/models/user-modal';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  AuthUser: UserModal;
  cart$: Observable<ShoppingCart>;

  constructor(public auth: AuthService, private shoppingCartService: ShoppingCartService) {
     
   }

  async ngOnInit() {
     this.auth.AuthUser$.subscribe(AuthUser => this.AuthUser = AuthUser);
    this.cart$ = await this.shoppingCartService.getCart();
  }

 logout() {
  this.auth.logout();
 }
 

 filterProduct(querys){
      this.shoppingCartService.changeMessage(querys)
 }
}
