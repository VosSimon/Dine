import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { IImage } from './modules/slideshow/IImage';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  messageForm: FormGroup;
  submitted = false;
  loading = false;

  imageUrlArray = [
    '../../assets/FixedImages/taart.jpg',
    '../../assets/FixedImages/taarten.jpg',
    '../../assets/FixedImages/Bread.jpg',

  ];

  height: string = '30vw';
  minHeight: string;
  arrowSize: string = '30px';
  showArrows: boolean = true;
  disableSwiping: boolean = false;
  autoPlay: boolean = true;
  autoPlayInterval: number = 3333;
  stopAutoPlayOnSlide: boolean = true;
  backgroundSize: string = 'cover';
  backgroundPosition: string = 'center center';
  backgroundRepeat: string = 'no-repeat';
  showDots: boolean = true;
  dotColor: string = '#FFF';
  showCaptions: boolean = true;
  captionColor: string = '#FFF';
  captionBackground: string = 'rgba(0, 0, 0, .35)';
  lazyLoad: boolean = true;
  hideOnNoSlides: boolean = false;
  width: string = '100%';
  fullscreen: boolean = false;

  constructor(
    private formBuilder: FormBuilder
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
    // console.log(data);
    // this.loginService.loginUser(fd);
  }


  // remove later //

  // npm i -S ng-simple-slideshow

}
