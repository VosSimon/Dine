import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  autocompletePost = new Subject<object[]>();
  accessToken: string = localStorage.getItem('token');

  headers = {
    Authorization: 'Bearer ' + this.accessToken
  };

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) { }

  handleProfile(fd, dataObject) {
    if (JSON.parse(localStorage.getItem('profile')) != null) {
      const id = JSON.parse(localStorage.getItem('profile')).id;
      return new Promise((resolve) => {
        this.http.put('http://dine.test/profile/' + id, dataObject, {
          headers: { Authorization: 'Bearer ' + this.accessToken }
        }).subscribe(
          (response: any) => {
            console.log(response);
            if (response.error) {
              this._snackBar.open(response.error, 'x', {
                duration: 5000
              });
            } else if (response.success) {
              this._snackBar.open(response.success, 'x', {
                duration: 5000
              });
              const profile = JSON.stringify(response.profile);
              localStorage.setItem('profile', profile);
            }
            resolve();
          },
          (error) => {
            console.log(error);
            this._snackBar.open(error, 'x', {
              duration: 5000
            });
          },
        );
      }
      );
    } else {
      return new Promise((resolve) => {
        this.http.post('http://dine.test/profile', fd).subscribe(
          (response: any) => {
            console.log(response);
            if (response.error) {
              this._snackBar.open(response.error, 'x', {
                duration: 5000
              });
            } else if (response.success) {
              this._snackBar.open(response.success, 'x', {
                duration: 5000
              });
              const profile = JSON.stringify(response.profile);
              localStorage.setItem('profile', profile);
            }
            resolve();
          },
          (error) => {
            console.log(error);
            this._snackBar.open(error, 'x', {
              duration: 5000
            });
          }
        );
      }
      );
    }
  }

  getProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.id;
    return new Promise(resolve => {
      this.http.get('http://dine.test/profile/' + id, { headers: this.headers }).subscribe(
      (response: any) => {
        const profile = JSON.stringify(response.data);
        localStorage.setItem('profile', profile);
        resolve(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
    });
  }

  autocompletePostcode(input: number) {
    this.http.get('https://www.opzoeken-postcode.be/' + input + '.json').subscribe((response: Array<object>) => {
      this.autocompletePost.next(response);
    });
  }
}
