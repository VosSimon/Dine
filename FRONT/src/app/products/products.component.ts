import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material';
import { Product } from '../models/product.model';
import { CartItem } from '../models/cart-item.model';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
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
  autocompleteList: Array<object> = [];
  searchInput:string;
  quantity;
  subscription: Subscription;
  // allergens: Array<object>;
  allergenMap = new Map();
  test = true;

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private cartService: ShoppingCartService,
    private _snackBar: MatSnackBar,
    ) {

    this.http.get('http://dine.test/categories').subscribe((result) => {
      this.categories = result['data'];
    });

    this.http.get('http://dine.test/allergens').subscribe((result) => {
      let allergens = result['data'];
      allergens.forEach((allergen) => {
        this.allergenMap.set(allergen['id'], allergen['name']);
      })

    })

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
    if (this.searchInput == "") {
      this.productService.searchByName(this.searchInput, this.pageSize);
      if (this.searchInput == "") this.autocompleteList = [];
      return;
      // when inputfield in cleared, all products are searched.
    }
    const data = new FormData();
    data.append("search", e.target.value);
    this.productService.autocompleteProduct(data);
  }

  searchByName(e) {
    if (e.type === "change"||e.type === "keydown"&&e.code === "Enter") {
      this.productService.searchByName(this.searchInput, this.pageSize);
      this.autocompleteList = [];
    }
  }

  quantityChanged() {
    this._snackBar.open('Vergeen niet op het winkelmandje te klikken om toe te voegen.', 'x.', {
      duration:4000
    });
  }

  addToShoppingCart(e, product: Product) {
    this.quantity = parseInt(e.path[1].children[2].value);
    e.path[1].children[2].value = 1;
    const cartItem = new CartItem(product, this.quantity);
    this.cartService.addToShoppingCart(cartItem);

    this._snackBar.open('Het artikel is toegevoegd aan je winkelmandje.', 'x', {
      duration:3000
    });
  }

  expansionPanel(id: Number) {
    let el = document.querySelector('#expand-' + id) as HTMLDivElement;
    let allExpansion = document.querySelectorAll('.expansionDiv') as NodeListOf<HTMLDivElement>;
    if (el.hidden === false) {
      el.hidden = !el.hidden;
    } else if (el.hidden === true) {
      allExpansion.forEach((expansionEl) => {
        expansionEl.hidden = true;
      })
      el.hidden = !el.hidden;
    }
  }



}
