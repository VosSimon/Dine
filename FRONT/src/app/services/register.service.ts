import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registeraccessToken: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  register(fd) {
    console.log(fd);
    return this.http.post('http://dine.test/register', fd).subscribe(
      (response: any) => {
        console.log(response);
        this.registeraccessToken = response.success.token;
        localStorage.setItem('token', this.registeraccessToken);
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error) {
        console.log(error);
        }
      }
    );
  }
}

// 'Accept' : 'application/ json',
//   'Authorization': 'Bearer'.$accessToken
