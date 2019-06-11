import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  create(fd) {
    return this.http.post('http://dine.test/create', fd).subscribe(
      (response: any) => {
        console.log(response);
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
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
