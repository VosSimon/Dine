import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShoppingCartService } from './shopping-cart.service';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class OrderService {

  order: Order;

  constructor(
    private http: HttpClient,
    private router: Router,
    private scService: ShoppingCartService,
    private _snackbar: MatSnackBar,
    ) {}

  placeOrder(items: CartItem[], pickupDate: string, paymentMethod: string, userId: number) {

    this.order = new Order(items, pickupDate, paymentMethod, userId);
    this.http.post('http://dine.test/orders', this.order).subscribe(() => {
      this.scService.removeAllItems();
      this._snackbar.open("Bestelling verzonden.", "x", {
        duration: 3000
      });
      this.router.navigate(['/products']);
    });
  }


}
