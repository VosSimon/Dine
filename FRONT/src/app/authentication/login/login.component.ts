import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
    private loginService: LoginService,
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email:  ['', [
        Validators.required,
        Validators.pattern('^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z]{2,3}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onLoginSubmit(event) {
    event.preventDefault();
    // console.log(this.loginForm.value);
    const fd = new FormData();
    fd.append('email', this.loginForm.value.email);
    fd.append('password', this.loginForm.value.password);
    this.submitted = true;
    this.loading = true;
    this.loginService.loginUser(fd);
  }

}
