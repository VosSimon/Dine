import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  accessToken: string = localStorage.getItem('token');
  credentials: string;



  'headers' = {
    Authorization : 'Bearer ' + this.accessToken,
  };



  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  loginUser(fd) {
    return this.http.post('http://dine.test/apilogin', fd).subscribe(
      (response: any) => {
        console.log(response);
        this.accessToken = response.success.token;
        localStorage.setItem('token', this.accessToken);
        this.router.navigate(['/profile']);
        this.getUser();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getUser() {
    return this.http.get('http://dine.test/apiuser', {headers: this.headers}).subscribe(
      (result: any) => {
        this.credentials = JSON.stringify(result);
        localStorage.setItem('user', this.credentials);
        console.log('You\'re in..This are your credentials: ' + this.credentials);
      }
    );
  }

  isLoggedIn() {
    return this.credentials != null;
  }

  logOut() {
    this.router.navigate(['login']);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return this.credentials = null;
  }
}
