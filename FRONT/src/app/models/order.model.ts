import { CartItem } from './cart-item.model';

export class Order {
  public items: CartItem[];
  public totalPrice: number = 0;
  public pickupDate: string;
  public paymentMethod: string;
  public userId: number

  constructor(items: CartItem[], pickupDate, paymentMethod: string, userId: number) {
    this.items = items;
    this.pickupDate = pickupDate;
    this.paymentMethod = paymentMethod
    this.items.forEach((item: CartItem) => {
      this.totalPrice += item.totalPrice;
    })
    this.userId = userId;
  }

  public getTotalPrice() {
    this.items.forEach((item: CartItem) => {
      this.totalPrice += item.totalPrice;
    })
    return this.totalPrice;
  }
}
