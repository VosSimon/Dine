import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs'

import { Product } from '../models/product.model';

@Injectable()
export class ProductService {

  private products: Product[] = [];
  private pageInformation = [];
  productsChanged = new Subject<Product[]>();
  pageInfoChanged = new Subject();
  autocompleteList = new Subject();

  constructor(private http: HttpClient) {}

  getProducts() {
    this.http.get('http://dine.test/products').subscribe((result) => {
      let products = result["data"];
      this.products = [];
      products.map((product) => {
        this.products.push(new Product(product.id, product.category_id, product.name, product.image, product.price, product.description));
      });
      this.productsChanged.next(this.products);
      this.pageInformation = [{
        nrProducts: result['total'],
        path: result['path'],
        pageSize: result['per_page'],
        index: result['current_page']}];
      this.pageInfoChanged.next(this.pageInformation);
    });
  }

  filterProducts(id:string, items:number) {
    this.http.get('http://dine.test/productByCategory/' + id + '?items=' + items).subscribe((result) => {
      let products = result["data"];
      this.products = [];
      products.map((product) => {
        this.products.push(new Product(product.id, product.category_id, product.name, product.image, product.price, product.description));
      });
      this.productsChanged.next(this.products);
      this.pageInformation = [{
        nrProducts: result['total'],
        path: result['path'],
        pageSize: result['per_page'],
        index: result['current_page']}];
      this.pageInfoChanged.next(this.pageInformation);
    });
  }

  autocompleteProduct(data) {
    this.http.post('http://dine.test/autocompleteProduct', data).subscribe((result) => {
      this.autocompleteList.next(result["data"]);
    });
  }

  searchByName(input, items) {
    this.http.get('http://dine.test/searchProductByName?name=' + input + '&items=' + items).subscribe((result) => {
      let products = result["data"];
      this.products = [];
      products.map((product) => {
        this.products.push(new Product(product.id, product.category_id, product.name, product.image, product.price, product.description));
      });
      this.productsChanged.next(this.products);
      this.pageInformation = [{
        nrProducts: result['total'],
        path: result['path'],
        pageSize: result['per_page'],
        index: result['current_page']}];
      this.pageInfoChanged.next(this.pageInformation);

      })
  }

  pageEvent(path, items, index) {
    this.http.get(path + '?items=' + items + '&page=' + index).subscribe((result) => {
      let products = result["data"];
      this.products = [];
      products.map((product) => {
        this.products.push(new Product(product.id, product.category_id, product.name, product.image, product.price, product.description));
      });
      this.productsChanged.next(this.products);
      this.pageInformation = [{
        nrProducts: result['total'],
        path: result['path'],
        pageSize: result['per_page'],
        index: result['current_page']}];
      this.pageInfoChanged.next(this.pageInformation);
    });
  }
}
