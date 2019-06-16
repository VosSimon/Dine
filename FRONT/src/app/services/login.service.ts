import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  accessToken: string = localStorage.getItem('token');
  credentials: string;
  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  isLoggedIn(): boolean {
    const status = JSON.parse(localStorage.getItem('loggedIn'));
    if (status === true) {
      this.setLoggedIn(true);
    }
    return status;
  }

  loginUser(fd) {
    return this.http.post('http://dine.test/apilogin', fd).subscribe(
      (response: any) => {
        if (response.error) {
          this._snackBar.open(response.error, 'x', { duration: 5000 });
        } else if (response.success) {
          this.accessToken = response.success.token;
          localStorage.setItem('token', this.accessToken);
          this.getUser().then(() => {
              if (this.isLoggedIn()) {
                this.router.navigate(['/profile']);
              }
            });
          }
        },
      (error) => {
        // console.log(error);
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

    return new Promise(resolve => {
      this.http.get('http://dine.test/apiuser', {headers: {
        Accept : 'application/json',
        Authorization : 'Bearer ' + this.accessToken,
      }}).subscribe(
      (response: any) => {
        const credentials = JSON.stringify(response.success);
        localStorage.setItem('user', credentials);
        localStorage.setItem('loggedIn', 'true');
        this.setLoggedIn(true);
        // console.log('This are your credentials: ' + credentials);
        resolve();
      },
      (error) => {
        this._snackBar.open(error.message, 'x', {
          duration: 10000
        });
      }
    );
     });
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  logOut() {
    return this.http.get('http://dine.test/logout', { headers: {
      'Accept' : 'application/json',
      Authorization : 'Bearer ' + this.accessToken,
      }
      }).subscribe(
      (response: any) => {
        this.router.navigate(['']);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.setItem('loggedIn', 'false');
        this.setLoggedIn(false);
      }
    );
  }
}
