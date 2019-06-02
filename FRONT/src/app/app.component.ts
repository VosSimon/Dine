import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // categories;

  constructor(
    private loginService: LoginService,
    private http: HttpClient
  ) {
    this.http.get('http://dine.test/categories').subscribe((result) => {
      // this.categories = result;
      console.log(result);

    });
  }

  ngOnInit() { }

  ngOnDestroy() { }

  logOut() {
    this.loginService.logOut();
  }

  isLoggedIn() {
    this.loginService.isLoggedIn();
  }

}
