import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  token: string;
  headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(data) {
    return this.http.post('http://dine.test/register', JSON.stringify(data)).subscribe(
      (response: any) => {
        console.log(response);
        // this.token = response.token;

        // console.log(this.token);
        // this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
