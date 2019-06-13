import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable()
export class OrderService {

  order: Order;

  constructor(
    private http: HttpClient,
    private router: Router,
    private scService: ShoppingCartService,
    ) {}

  placeOrder(items: CartItem[], pickupDate, paymentMethod: string, userId: number) {

    this.order = new Order(items, pickupDate, paymentMethod, userId);
    this.http.post('http://dine.test/orders', this.order).subscribe(() => {
      this.scService.removeAllItems();
      this.router.navigate(['/products']);
    });
  }


}
