import { Component, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material';



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
  autocomplete:Array<object>;

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
    this.http.get('http://dine.test/productByCategory/' + categoryId).subscribe((result) => {
      this.products = result['data'];
      console.log(result);

      this.length = result['total'];
      this.path = result['path'];
      this.pageSize = result['per_page'];
      this.index = result['current_page'];
      this.paginator.pageIndex = 0;
    });
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

  searchByName(e) {
    this.http.post('http://dine.test/searchProduct/', JSON.stringify(e.target.value)).subscribe((result) => {
      console.log(result);

    });

  }

  ngOnInit() {
  }

}
