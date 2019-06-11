import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { PasswordResetService } from '../../services/password-reset.service';

@Component({
  selector: 'app-reset-request',
  templateUrl: './reset-request.component.html',
  styleUrls: ['./reset-request.component.scss']
})
export class ResetRequestComponent implements OnInit {

  resetRequestForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService
  ) { }

  ngOnInit() {
    this.resetRequestForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z]{2,3}$')
      ]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.resetRequestForm.controls; }

  sendPassResetEmail(event) {
    event.preventDefault();
    const fd = new FormData();
    fd.append('email', this.resetRequestForm.value.email);
    this.submitted = true;
    this.loading = true;
    this.passwordResetService.create(fd);
  }
}
