import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  handleProfile(data) {
    return this.http.post('http://dine.test/profile', JSON.stringify(data)).subscribe(
      (response: any) => {
        console.log(response);

        // this.router.navigate(['/']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
