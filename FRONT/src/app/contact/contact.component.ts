import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ContactMessageService } from '../services/contact-message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  messageForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private contactMessageService: ContactMessageService
  ) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern('^\\w+[\\w-\\.]*\\@\\w+((-\\w+)|(\\w*))\\.[a-z]{2,3}$')
      ]],
      message: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(140)
      ]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.messageForm.controls; }

  onMessageSubmit(event) {
    event.preventDefault();
    // console.log(this.messageForm.value);
    const fd = new FormData();
    fd.append('email', this.messageForm.value.email);
    fd.append('message', this.messageForm.value.message);
    this.submitted = true;
    this.loading = true;
    this.contactMessageService.send(fd);
    this.loading = false;
  }
}
