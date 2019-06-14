import { Product } from './product.model';

export class CartItem {
  public product: Product;
  public quantity: number;
  public totalPrice: number;


  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
    this.totalPrice = product.price * this.quantity;
  }

  public alterQuantity(plusOrMin, nrsPlusOrMin = 1) {
    if (plusOrMin === 'min') {
      this.quantity -= nrsPlusOrMin;
      if (this.quantity < 1) this.quantity = 1;
    } else if (plusOrMin === 'plus') {
      this.quantity += nrsPlusOrMin;
    }
    this.totalPrice = this.product.price * this.quantity;
  }
}
