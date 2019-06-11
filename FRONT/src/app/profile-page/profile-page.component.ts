import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  profileForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService
    ) { }

  ngOnInit() {
    this.profileForm = this.formBuilder.group({
      fname: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      lname: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      telephone: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      company: ['', [
      //   Validators.required,
      //   Validators.minLength(2)
      ]],
      btw: ['', [
      //   Validators.required,
      //   Validators.minLength(2)
      ]],
      address: ['', [
        // Validators.required,
        // Validators.minLength(2)
      ]],
      postcode: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
    });
  }

  get f() { return this.profileForm.controls; }

  onProfileSubmit() {
    console.log(this.profileForm.value);

    // stop here if form is invalid
    // this is not necesary because I set the submit button to disabled if the form is not valid
    if (this.profileForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;
    const data = this.profileForm.value;
    // console.log(data);
    this.profileService.handleProfile(data);
  }
}
