import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

import { PasswordResetService } from '../../services/password-reset.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss']
})
export class PasswordResetComponent implements OnInit {

  passresetForm: FormGroup;
  hide = true;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService
  ) { }

  ngOnInit() {
    this.passresetForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z]{2,3}$')
      ]],
      token: ['',[
        Validators.required,
        Validators.minLength(60)
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
  get f() { return this.passresetForm.controls; }

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

  onResetSubmit(event) {
    // console.log(this.registerForm.value);
    event.preventDefault();
    // stop here if form is invalid
    // this is not necesary because I set the submit button to disabled if the form is not valid
    if (this.passresetForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;
    // const data = this.registerForm.value;
    const fd = new FormData();
    fd.append('email', this.passresetForm.value.email);
    fd.append('token', this.passresetForm.value.token);
    fd.append('password', this.passresetForm.value.password);
    fd.append('password_confirmation', this.passresetForm.value.password_confirmation);
    // console.log(fd);
    this.passwordResetService.reset(fd);
  }

}
