import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  profileForm: FormGroup;
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  subscription: Subscription;
  itemsInShoppingCart: number = 0;
  cartArray: CartItem[];
  totalPrice: number = 0;
  orderPickupDate: string;
  date: string;
  time: string;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: ShoppingCartService,
    private orderService: OrderService
    ) {}

  ngOnInit() {
    this.itemsInShoppingCart = this.cartService.getNrOfItemsInShoppingCart();
    this.cartArray = this.cartService.getShoppingCart();
    this.totalPrice = this.cartService.getTotalPrice();

    this.firstFormGroup = this.formBuilder.group({
      orderDate: ['', Validators.required],
      orderTime: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      paymentMethod: ['', Validators.required]
    });

  }

  firstFormSubmit(e) {
    if (this.firstFormGroup.valid) {
      this.date = new Date(this.firstFormGroup.value.orderDate).toLocaleDateString();
      this.time = this.firstFormGroup.value.orderTime
      this.orderPickupDate = this.date + "|" + this.time;
    }

  }

  orderSubmit() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.orderService.placeOrder(this.cartArray, this.orderPickupDate, this.secondFormGroup.value, user.success.id);

  }
}
