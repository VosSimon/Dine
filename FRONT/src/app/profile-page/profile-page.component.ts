import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ProfileService } from '../services/profile.service';
import { Subscription } from 'rxjs';
import { reject } from 'q';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {

  profileForm: FormGroup;
  submitted = false;
  loading = false;
  postcodeOptions: Array<object>;
  subscription: Subscription;
  autofilledGemeente: string = '';

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
        Validators.minLength(9)
      ]],
      birthDate: ['', [
      ]],
      company: ['', [
      //   Validators.required,
      //   Validators.minLength(2)
      ]],
      btw: ['', [
      //   Validators.required,
      //   Validators.minLength(2)
      ]],
      postcode: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],
      city: ['', [
        Validators.minLength(3)
      ]],
    });

    this.subscription = this.profileService.autocompletePost.subscribe((postecodeArray: Array<object>) => {
      this.postcodeOptions = postecodeArray;
    })
  }

  get f() { return this.profileForm.controls; }

  onProfileSubmit(event) {
    event.preventDefault();
    // console.log(this.profileForm.value);

    // stop here if form is invalid
    // this is not necesary because I set the submit button to disabled if the form is not valid
    if (this.profileForm.invalid) {
      return;
    }
    this.submitted = true;
    this.loading = true;
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.id;
    // const fd = new FormData();
    // fd.append('userId', id);
    // fd.append('fname', this.profileForm.value.fname);
    // fd.append('lname', this.profileForm.value.lname);
    // fd.append('telephone', this.profileForm.value.telephone);
    // fd.append('birthDate', this.profileForm.value.birthDate);
    // fd.append('company', this.profileForm.value.company);
    // fd.append('btw', this.profileForm.value.btw);
    // fd.append('postcode', this.profileForm.value.postcode);
    // console.log(id);
    const fd = {
      userId: id,
      fname: this.profileForm.value.fname,
      lname: this.profileForm.value.lname,
      telephone: this.profileForm.value.telephone,
      birthdate: this.profileForm.value.birthDate,
      company: this.profileForm.value.company,
      btw: this.profileForm.value.btw, postcode:
      this.profileForm.value.postcode}
    this.profileService.handleProfile(fd).then(() => {
      this.loading = false;
    })
  }

  autocompletePostcode(e) {
    this.profileService.autocompletePostcode(e.target.value);
  }

  autofillGemeente(e) {
    this.autofilledGemeente = e.option._element.nativeElement.dataset.gemeente;
  }
}
