import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {
  message: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  create(fd) {
    return this.http.post('http://dine.test/create', fd).subscribe(
      (response: any) => {
        console.log(response);
        this.message = JSON.stringify(response.message);
        this._snackBar.open(response.message, 'x', {
          duration: 3000
        });
        this.router.navigate(['/passwordreset']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  reset(fd) {
    return this.http.post('http://dine.test/reset', fd).subscribe(
      (response: any) => {
        console.log(response);
        this.message = JSON.stringify(response.message);
        this._snackBar.open(response.message, 'x', {
          duration: 3000
        });
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
