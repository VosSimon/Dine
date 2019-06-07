import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService, MatSnackBar]
})

export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  products: Product[];
  categories: Array<object>;
  length = 0;
  index: number;
  path: string;
  pageSize: number;
  pageSizeOptions: number[] = [1, 5, 10, 25, 50];
  showSearchProductList = false;
  autocompleteList: Array<object>;
  searchInput:string;
  productQuantity;
  quantity;
  pageInformation;
  subscription: Subscription;
  message: string = "";
  showMessage: boolean = false;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private _snackBar: MatSnackBar,
    ) {

    this.http.get('http://dine.test/categories').subscribe((result) => {
      this.categories = result['data'];
    });

  }

  ngOnInit() {
    this.productService.getProducts();

    this.subscription = this.productService.productsChanged.subscribe((product: Product[]) => {
      this.products = product;
    })
    this.subscription = this.productService.pageInfoChanged.subscribe((info) => {
      this.length = info[0].nrProducts;
      this.path = info[0].path;
      this.pageSize = info[0].pageSize;
      this.index = info[0].index
    })


  }

  ngAfterViewInit() {
    this.productService.autocompleteList.subscribe((list:Array<object>) => {
      this.autocompleteList = list;
      if (this.autocomplete.length > 0) this.showSearchProductList = true;
      if (this.searchInput === "") this.showSearchProductList = false;
    })
  }

  filterProduct(e) {
    const categoryId = e.target.value;
    const items = this.pageSize;
    if (categoryId !== "0") {
      this.productService.filterProducts(categoryId, items);
    } else {
      this.productService.getProducts();
    }
  }

  pageEvent(e) {
    this.index = e.pageIndex + 1;
    if (this.pageSize != e.pageSize) {
      this.index = 0;
    }
    this.pageSize = e.pageSize;
    this.productService.pageEvent(this.path, this.pageSize, this.index);
  }

  autocomplete(e) {
    const data = new FormData();
    data.append("search", e.target.value);
    this.productService.autocompleteProduct(data);

  }

  searchByName(e) {
    if (e.type === "change"||e.type === "keydown"&&e.code === "Enter") {
      this.productService.searchByName(this.searchInput, this.pageSize);
      document.querySelector<HTMLSelectElement>('#filterProducts').value = "0";
      document.querySelector<HTMLSelectElement>('#autocompleteList').hidden = true;
      // this.showSearchProductList = false;
      // TODO:: strange error when setting showSearchProductList to false.
      // solved with queryselector but problem when searching product and type more. need to clear input first.
    }
  }

  addToShoppingCart(e, product: Product) {
    this.quantity = parseInt(e.path[1].children[2].value);
    e.path[1].children[2].value = 0;
    const cartItem = new CartItem(product, this.quantity);
    this.cartService.addToShoppingCart(cartItem);

    this._snackBar.open('Het artikel is toegevoegd aan je winkelmandje.', 'x', {
      duration:3000
    });
  }



}
