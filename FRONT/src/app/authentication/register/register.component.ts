import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  hide = true;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z]{2,3}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(16)
      ]],
      password_confirmation: ['',
        this.passValidator
      ]
    });

    this.f.password.valueChanges
      .subscribe(
        x => this.f.password_confirmation.updateValueAndValidity()
      );
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password'); // magic is this
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  onRegisterSubmit() {
    console.log(this.registerForm.value);

    // stop here if form is invalid
    // this is not necesary because I set the submit button to disabled if the form is not valid
    if (this.registerForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;
    const data = this.registerForm.value;
    // console.log(data);
    this.registerService.register(data);
  }

}
