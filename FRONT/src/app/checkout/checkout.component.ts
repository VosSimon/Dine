import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { OrderService } from '../services/order.service';
import { CartItem } from '../models/cart-item.model';
import { DateAdapter } from '@angular/material';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  profileForm: FormGroup;
  isLinear = true;
  dateTimeFormGroup: FormGroup;
  subscription: Subscription;
  itemsInShoppingCart: number = 0;
  cartArray: CartItem[];
  totalPrice: number = 0;
  orderPickupDate: string;
  date: string;
  time: string;
  dateClass = (d: Date) => {
    const date = d.getDate();
    const now = new Date().getDate();
    return (date === now) ? 'example-custom-date-class' : undefined;
  }
  minDate: Date;
  color: string = "warn";

  constructor(
    private themeService: ThemeService,
    private formBuilder: FormBuilder,
    private cartService: ShoppingCartService,
    private orderService: OrderService,
    private _adapter: DateAdapter<any>,
    ) {
      this._adapter.setLocale('fr');
      // set the local date notation for date picker to fr for ex 14/6/2019.
      this.minDate = new Date();
      let days: number = this.minDate.getHours() >= 15?  2: 1;
      this.minDate.setDate(this.minDate.getDate() + days);

    }
  ngOnInit() {
    this.itemsInShoppingCart = this.cartService.getNrOfItemsInShoppingCart();
    this.cartArray = this.cartService.getShoppingCart();
    this.totalPrice = this.cartService.getTotalPrice();

    this.dateTimeFormGroup = this.formBuilder.group({
      orderDate: ['', [Validators.required, this.dateValidator.bind(this)]],
      orderTime: ['', [Validators.required, this.timeValidator.bind(this)]]
    });

    this.subscription = this.themeService.theme.subscribe((color: string) => {
      this.color = color;
    })
  }

  dateValidator(control: AbstractControl) {
    let givenDate: Date = new Date(control.value);
    this.date = givenDate.toLocaleDateString();
    return null
  }
  timeValidator(control: AbstractControl) {
    this.time = control.value;
    return null;
  }

  orderSubmit() {
    let dateArray = this.date.split("-");
    this.orderPickupDate = dateArray[2] + "-" + dateArray[1] + "-" + dateArray[0] + " " + this.time + ":00";
    // combining the date and time and setting it to mysql format yyyy-mm-dd hh:mm:ss
    console.log(this.orderPickupDate);
    let user = JSON.parse(localStorage.getItem('user'));
    this.orderService.placeOrder(this.cartArray, this.orderPickupDate, "bakery", user.id);
  }
}
