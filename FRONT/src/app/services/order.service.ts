import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { CartItem } from '../models/cart-item.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class OrderService {

  order: Order;

  constructor(private http: HttpClient) {}

  placeOrder(items: CartItem[], pickupDate, paymentMethod: string, userId: number) {

    this.order = new Order(items, pickupDate, paymentMethod, userId);
    this.http.post('http://dine.test/orders', this.order).subscribe((res) => {
      console.log(res);

    });


  }


}
