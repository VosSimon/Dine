import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingCartService {

  cartChanged = new Subject<CartItem[]>();
  itemsInShoppingCartChanged = new Subject<number>();

  cartArray: CartItem[] = [
    // new CartItem(
    //   new Product(10, 2, "test", "4eneOSC8RnJi4l7TnpDoUXbAmJSepL4Ok2lADBPV.jpeg", 3.14),
    //   500
    // )
  ];

  constructor() {
    let promise = new Promise((res, rej) => {
      if (localStorage.getItem('dine-shopping-cart')) {
        res(JSON.parse(localStorage.getItem('dine-shopping-cart')))
      } else {
        rej('No shopping cart found in localstorage.');
      }
    })

    // check if shopping cart in localstorage
    promise.then((result: CartItem[]) => {
      console.log('Shopping cart found in localstorage.');
      result.forEach((item) => {
        this.cartArray.push(new CartItem(item.product, item.quantity));
      })
      console.log(this.cartArray);
      this.cartChanged.next(this.cartArray);
      this.itemsInShoppingCartChanged.next(this.cartArray.length);
    }).catch((err) => console.log(err));




  }

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
    localStorage.setItem('dine-shopping-cart', JSON.stringify(this.cartArray));
    // add shopping cart to localstorage
  }

  getShoppingCart() {
    return this.cartArray;
  }

  getNrOfItemsInShoppingCart() {
    return this.cartArray.length;
  }

  getTotalPrice() {
    let totalPrice: number = 0;
    this.cartArray.forEach((item: CartItem) => {
      totalPrice += item.totalPrice;
    })
    return totalPrice;
  }

  counter(plusOrMin, cartItem: CartItem) {
    cartItem.alterQuantity(plusOrMin);
    this.cartChanged.next(this.cartArray);
    localStorage.setItem('dine-shopping-cart', JSON.stringify(this.cartArray));
  }

  removeItem(cartItem: CartItem) {
    let indexOfItem = this.cartArray.indexOf(cartItem);
    this.cartArray.splice(indexOfItem, 1);
    this.cartChanged.next(this.cartArray);
    this.itemsInShoppingCartChanged.next(this.cartArray.length);
    localStorage.setItem('dine-shopping-cart', JSON.stringify(this.cartArray));
    if (this.cartArray.length == 0) {
      localStorage.removeItem('dine-shopping-cart');
    }
  }

}
