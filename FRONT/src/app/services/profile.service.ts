import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {

  autocompletePost = new Subject<object[]>();

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

  autocompletePostcode(input: number) {
    this.http.get('https://www.opzoeken-postcode.be/'+input+'.json').subscribe((response: Array<object>) => {
      this.autocompletePost.next(response);
    })
  }
}
