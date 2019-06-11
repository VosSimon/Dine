import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: 'register',
    loadChildren: './authentication/authentication.module#AuthenticationModule'
  },
  {
    path: ' ',
    component: LandingPageComponent
  },
  {
    path: 'profile',
    component: ProfilePageComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'cart',
    component: ShoppingCartComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
