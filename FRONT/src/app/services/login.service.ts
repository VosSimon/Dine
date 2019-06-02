import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  credentials: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  loginUser(data) {
    return this.http.post('http://dine.test/login', JSON.stringify(data)).subscribe(
      (response: any) => {
        const message = response;
        console.log(message);
        this.router.navigate(['/']);
        // this.getCredentials();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // getCredentials() {
  //   return this.http.get('http://localhost:7707/login').subscribe(
  //     (result: any) => {
  //       this.credentials = JSON.stringify(result);
  //       localStorage.setItem('user', this.credentials);
  //       console.log('You\'re in..This are your credentials: ' + this.credentials);
  //     }
  //   );
  // }

  isLoggedIn() {
    return this.credentials != null;
  }

  logOut() {
    this.router.navigate(['login']);
    localStorage.removeItem('user');
    return this.credentials = null;
  }
}
