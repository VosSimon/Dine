import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';
import { CartItem } from '../models/cart-item.model';
import { MatSnackBar } from '@angular/material';

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
    private orderService: OrderService,
    private _snackBar: MatSnackBar,
    ) {}

  ngOnInit() {
    this.itemsInShoppingCart = this.cartService.getNrOfItemsInShoppingCart();
    this.cartArray = this.cartService.getShoppingCart();
    this.totalPrice = this.cartService.getTotalPrice();

    this.firstFormGroup = this.formBuilder.group({
      orderDate: ['', [Validators.required, this.dateValidator.bind(this)]],
      orderTime: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      paymentMethod: ['', Validators.required]
    });

  }

  dateValidator(control: AbstractControl) {
    let daysToAdd = 1;
    let time = new Date();
    let hours = time.getHours();
    if (hours >= 15) {
      console.log("after 15h");

      daysToAdd = 2;
    }
    let date = new Date(control.value);
    let nowPlusDay = new Date();
    let dayPlus = nowPlusDay.getDate() + daysToAdd;
    nowPlusDay.setDate(dayPlus);
    if (date.toLocaleDateString() < nowPlusDay.toLocaleDateString()) {
      this._snackBar.open('Bestellingen dienen 1 dag op voorhand te gebeuren, 2 dagen als u besteld na 15u.', 'x', {
        duration: 5000
      })
      return {isError: true};
    } else {
      return null;
    }

  }

  orderSubmit() {
    let user = JSON.parse(localStorage.getItem('user'));
    this.orderService.placeOrder(this.cartArray, this.orderPickupDate, this.secondFormGroup.value, user.success.id);

  }
}
