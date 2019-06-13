import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';


@Injectable({
  providedIn: 'root'
})
export class ContactMessageService {
  message: string;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  send(fd) {
    return new Promise((resolve) => {
      this.http.post('http://dine.test/contact/message', fd).subscribe(
      (response: any) => {
        console.log(response);
        this.message = JSON.stringify(response.message);
        this._snackBar.open(response.message, 'x', {
          duration: 3000
        });
        resolve();
      },
      (error) => {
        console.log(error);
        this._snackBar.open(error.message, 'x', {
          duration: 10000
        });
      }
    );
    });
  }
}
