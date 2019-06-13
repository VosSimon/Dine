import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthenticationModule } from './authentication/authentication.module';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { ProfileService } from './services/profile.service';
import { PasswordResetService } from './services/password-reset.service';
import { AuthGuard } from './services/auth-guard.service';
import { ShoppingCartService } from './services/shopping-cart.service';
import { OrderService } from './services/order.service';

// Material section
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule, MatSnackBar } from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { CurrencyPipe } from './currency.pipe';
import { MenuComponent } from './menu/menu.component';

import { SlideshowModule } from 'ng-simple-slideshow';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    LandingPageComponent,
    ProfilePageComponent,
    ShoppingCartComponent,
    ContactComponent,
    AboutComponent,
    CurrencyPipe,
    MenuComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatBadgeModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SlideshowModule,
    MatStepperModule,
    MatRadioModule,
    MatAutocompleteModule
  ],
  providers: [
    LoginService,
    RegisterService,
    ProfileService,
    PasswordResetService,
    AuthGuard,
    ProductService,
    MatDatepickerModule,
    ShoppingCartService,
    OrderService,
    MatDatepickerModule,
    MatSnackBar,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
