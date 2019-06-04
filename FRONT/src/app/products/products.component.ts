import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  products: Array<object>;
  categories: Array<object>;
  length = 0;
  index: number;
  path: string;
  pageSize: number;
  pageSizeOptions: number[] = [1, 5, 10, 25, 50];
  showSearchProductList = false;
  autocompleteList: Array<object>;
  searchInput:string;

  constructor(private http: HttpClient) {

    this.http.get('http://dine.test/products').subscribe((result) => {
      this.products = result['data'];
      console.log(result);

      this.length = result['total'];
      this.path = result['path'];
      this.pageSize = result['per_page'];
      this.index = result['current_page'];
    });
    this.http.get('http://dine.test/categories').subscribe((result) => {
      this.categories = result['data'];
      console.log(this.categories);

    });
  }

  filterProduct(e) {
    const categoryId = e.target.value;
    if (categoryId !== "0") {
      this.http.get('http://dine.test/productByCategory/' + categoryId + '?items=' + this.pageSize).subscribe((result) => {
        this.products = result['data'];
        console.log(result);

        this.length = result['total'];
        this.path = result['path'];
        this.pageSize = result['per_page'];
        this.index = result['current_page'];
        this.paginator.pageIndex = 0;
      });
    }
  }

  pageEvent(e) {
    console.log(e);
    this.pageSize = e.pageSize;
    this.index = e.pageIndex + 1;
    this.http.get(this.path + '?items=' + this.pageSize + '&page=' + this.index).subscribe((result) => {
      this.products = result['data'];
      this.length = result['total'];
    });
  }

  autocomplete(e) {
    const data = new FormData();
    data.append("search", e.target.value);
    // const data = JSON.stringify({search : e.target.value});
    this.http.post('http://dine.test/autocompleteProduct', data).subscribe((result) => {
      this.autocompleteList = result["data"];
      this.showSearchProductList = true;
      if (this.searchInput === "") this.showSearchProductList = false;

    });

  }

  searchByName(e) {
    if (e.type === "change"||e.type === "keydown"&&e.code === "Enter") {

      this.http.get('http://dine.test/searchProductByName?name=' + this.searchInput + '&items=' + this.pageSize).subscribe((result) => {
        this.products = result["data"];
        document.querySelector<HTMLSelectElement>('#filterProducts').value = "0";
        this.showSearchProductList = false;
      })
    }
  }

  ngOnInit() {
  }

}
