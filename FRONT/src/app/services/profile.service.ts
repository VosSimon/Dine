import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  autocompletePost = new Subject<object[]>();
  accessToken: string = localStorage.getItem('token');

  'headers' = {
    Authorization: 'Bearer ' + this.accessToken,
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  handleProfile(fd) {
    if (localStorage.getItem('profile') != null) {
      const id = JSON.parse(localStorage.getItem('profile')).id;
      console.log(id);
      console.log(fd);
      return this.http.put('http://dine.test/profile/' + id , { headers: this.headers }, fd).subscribe(
        (response: any) => {
          console.log(response);
          if (response.error) {
            this._snackBar.open(response.error, 'x', { duration: 5000 });
          } else if (response.success) {
            this._snackBar.open(response.success, 'x', { duration: 5000 });
            const profile = JSON.stringify(response.profile);
            localStorage.setItem('profile', profile);
          }
          // this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this._snackBar.open(error, 'x', { duration: 5000 });
        }
      );
    } else {
      return this.http.post('http://dine.test/profile', fd).subscribe(
        (response: any) => {
          console.log(response);
          if (response.error) {
            this._snackBar.open(response.error, 'x', { duration: 5000 });
          } else if (response.success) {
            this._snackBar.open(response.success, 'x', { duration: 5000 });
            const profile = JSON.stringify(response.profile);
            localStorage.setItem('profile', profile);
          }
          // this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
          this._snackBar.open(error, 'x', { duration: 5000 });
        }
      );
    }
  }

  updateProfile(fd) {
    return this.http.put('http://dine.test/profile', fd).subscribe(
      (response: any) => {
        console.log(response);
        if (response.error) {
          this._snackBar.open(response.error, 'x', { duration: 5000 });
        } else if (response.success) {
          this._snackBar.open(response.success, 'x', { duration: 5000 });
          const profile = JSON.stringify(response.profile);
          localStorage.setItem('profile', profile);
        }
        // this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
        this._snackBar.open(error, 'x', { duration: 5000 });

      }
    );
  }

  autocompletePostcode(input: number) {
    this.http.get('https://www.opzoeken-postcode.be/' + input + '.json').subscribe((response: Array<object>) => {
      this.autocompletePost.next(response);
    })
  }
}
