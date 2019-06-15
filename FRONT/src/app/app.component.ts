import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CartItem } from './models/cart-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // categories: Array<object>;

  itemsInCart: number = 0;
  subscription: Subscription;
  shoppingCartList: CartItem[];
  loggedIn: boolean;

  constructor(
    private loginService: LoginService,
    private http: HttpClient,
    private cartService : ShoppingCartService
  ) {
    // this.http.get('http://dine.test/categories').subscribe((result) => {
    //   this.categories = result['data'];
    // });
  }

  ngOnInit() {
    this.subscription = this.loginService.loggedIn$.subscribe(boolean => {
      this.loggedIn = boolean;
      console.log(this.loggedIn);
    });

    this.subscription = this.cartService.itemsInShoppingCartChanged.subscribe(number => {
      this.itemsInCart = number;
    });

    this.subscription = this.cartService.cartChanged.subscribe((items: CartItem[]) => {
      this.shoppingCartList = items;
    });

    if (JSON.parse(localStorage.getItem('loggedIn'))) {
      this.loggedIn = true;
    }
  }

  ngOnDestroy() { }

  logOut() {
    this.loginService.logOut();
  }

}
