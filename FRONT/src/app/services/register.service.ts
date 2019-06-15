import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registeraccessToken: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  register(fd) {
    console.log(fd);
    return this.http.post('http://dine.test/apiregister', fd).subscribe(
      (response: any) => {
        console.log(response);
        if (response.error) {
          this._snackBar.open(response.error, 'x', { duration: 5000 });
        } else if (response.success) {
          this.registeraccessToken = response.success.token;
          localStorage.setItem('token', this.registeraccessToken);
          this._snackBar.open(response.message, 'x', { duration: 10000 });
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.log(error);
        if (error.error.error.email) {
          const emailError = error.error.error.email;
          this._snackBar.open(emailError, 'x', { duration: 5000 });
        }
        if (error.error.error.password) {
          const passError = error.error.error.password;
          this._snackBar.open(passError, 'x', { duration: 5000 });
        }
        if (error.error.error.password_confirmation) {
          const passconfError = error.error.error.password_confirmation;
          this._snackBar.open(passconfError, 'x', { duration: 5000 });
        }
      }
    );
  }
}

// 'Accept' : 'application/ json',
//   'Authorization': 'Bearer'.$accessToken
