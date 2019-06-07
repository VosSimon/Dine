import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingCartService {

  cartChanged = new Subject<CartItem[]>();
  itemsInShoppingCartChanged = new Subject<number>();

  private cartArray: CartItem[] = [
    // new CartItem(
    //   new Product(10, 2, "test", "4eneOSC8RnJi4l7TnpDoUXbAmJSepL4Ok2lADBPV.jpeg", 3.14),
    //   500
    // )
  ];

  addToShoppingCart(cartItem: CartItem) {
    let articleAlreadyInCart = this.cartArray.find((item) => {
      return item.product.id == cartItem.product.id
    });
    if (articleAlreadyInCart) {
      articleAlreadyInCart.alterQuantity('plus', cartItem.quantity);
    }
    // if article is already in shopping cart only add quantity

    if (!articleAlreadyInCart) {
      this.cartArray.push(cartItem);
    }
    // if article is not in shopping cart, add it

    this.cartChanged.next(this.cartArray);
    this.itemsInShoppingCartChanged.next(this.cartArray.length);
  }

  getShoppingCart() {
    return this.cartArray;
  }


}
