import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './services/login.service';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './services/shopping-cart.service';
import { CartItem } from './models/cart-item.model';
import { ThemeService } from './services/theme.service';

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
  color:string = "warn";
  colorTrigger: string = "I'm blue";

  constructor(
    private themeService: ThemeService,
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
    });

    this.subscription = this.cartService.itemsInShoppingCartChanged.subscribe(number => {
      this.itemsInCart = number;
    });

    this.subscription = this.cartService.cartChanged.subscribe((items: CartItem[]) => {
      this.shoppingCartList = items;
    });

    this.subscription = this.themeService.theme.subscribe((color: string) => {
      this.color = color;
    })

    if (JSON.parse(localStorage.getItem('loggedIn'))) {
      this.loggedIn = true;
    }
  }

  toggleColor() {
    if (this.color == "warn") {
      this.themeService.changeColor("primary");
    } else {
      this.themeService.changeColor("warn");
    }
  }

  cartColor() {
    if (this.color == "warn") return "primary"
    else return "warn";
  }

  ngOnDestroy() { }

  logOut() {
    this.loginService.logOut();
  }

}
