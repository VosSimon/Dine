import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { EmailValidator } from '@angular/forms';

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
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  loginUser(fd) {
    return this.http.post('http://dine.test/apilogin', fd).subscribe(
      (response: any) => {
        console.log(response);
        if (response.error) {
          this._snackBar.open(response.error, 'x', { duration: 5000 });
        } else if (response.success) {
          this.accessToken = response.success.token;
          localStorage.setItem('token', this.accessToken);
          this.getUser();
          this.router.navigate(['/profile']);
        }
      },
      (error) => {
        console.log(error);
        if (error.error.email) {
          const emailError = error.error.email;
          this._snackBar.open(emailError, 'x', { duration: 5000 });
        }
        if (error.error.password) {
          const passError = error.error.password;
          this._snackBar.open(passError, 'x', { duration: 5000 });
        }
      }
    );
  }

  getUser() {
    return this.http.get('http://dine.test/apiuser', {headers: this.headers}).subscribe(
      (response: any) => {
        this.credentials = JSON.stringify(response);
        localStorage.setItem('user', this.credentials);
        console.log('You\'re in..This are your credentials: ' + this.credentials);
      },
      (error) => {
        this._snackBar.open(error.message, 'x', {
          duration: 10000
        });
      }
    );
  }

  isLoggedIn() {
    return this.credentials != null;
  }

  logOut() {
    return this.http.get('http://dine.test/logout', { headers: this.headers }).subscribe(
      (response: any) => {
        console.log(response);
        this.router.navigate(['']);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return this.credentials = null;
      }
    );
  }
}
