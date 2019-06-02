import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  hide = true;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z]{2,3}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30)
      ]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onLoginSubmit() {
    // console.log(this.loginForm.value);
    this.submitted = true;
    this.loading = true;
    const data = this.loginForm.value;
    // console.log(data);
    this.loginService.loginUser(data);
  }

}
