import { Component, OnInit } from '@angular/core';

import { ShoppingCartService } from '../services/shopping-cart.service';
import { CartItem } from '../models/cart-item.model';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  shoppingCartList: CartItem[];
  itemsInShoppingCart: number = 0;
  totalAmount: number = 0;
  subscription: Subscription;


  constructor(
    private cartService: ShoppingCartService,
    private _snackBar: MatSnackBar ) {  }


  ngOnInit() {
    this.shoppingCartList = this.cartService.getShoppingCart();
    this.itemsInShoppingCart = this.shoppingCartList.length;
    this.shoppingCartList.forEach((item) => {
      this.totalAmount += item.totalPrice
    })

    this.subscription = this.cartService.cartChanged
      .subscribe((items: CartItem[]) => {
          this.shoppingCartList = items;
          this.totalAmount = 0;
          this.shoppingCartList.forEach((item) => {
          this.totalAmount += item.totalPrice;
          })
        }
    );

    this.subscription = this.cartService.itemsInShoppingCartChanged.subscribe(number => {
      this.itemsInShoppingCart = number;
    })

  }

  counter(plusOrMin, cartItem: CartItem) {
    this.cartService.counter(plusOrMin, cartItem);
    this.totalAmount = 0;
    this.shoppingCartList.forEach((item: CartItem) => {
      this.totalAmount += item.totalPrice;
    })
  }

  removeItem(cartItem: CartItem) {
    this.cartService.removeItem(cartItem);
  }

  goToCheckout() {
    if (this.itemsInShoppingCart < 1) {
      this._snackBar.open('Oeps, niet vergeten producten toe te voegen!', 'x', {
        duration: 3000
      })
    }
  }
}
