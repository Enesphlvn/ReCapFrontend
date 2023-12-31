import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { NaviComponent } from './components/navi/navi.component';
import { CarComponent } from './components/car/car.component';
import { RentalComponent } from './components/rental/rental.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { RentalAddComponent } from './components/add/rental-add/rental-add.component';

import { ToastrModule } from 'ngx-toastr';
import { PaymentComponent } from './components/payment/payment.component';
import { PayComponent } from './components/pay/pay.component';
import { BrandAddComponent } from './components/add/brand-add/brand-add.component';
import { ColorAddComponent } from './components/add/color-add/color-add.component';
import { CarAddComponent } from './components/add/car-add/car-add.component';
import { BrandUpdateComponent } from './components/update/brand-update/brand-update.component';
import { ColorUpdateComponent } from './components/update/color-update/color-update.component';
import { CarUpdateComponent } from './components/update/car-update/car-update.component';
import { CarDeleteComponent } from './components/delete/car-delete/car-delete.component';
import { BrandDeleteComponent } from './components/delete/brand-delete/brand-delete.component';
import { ColorDeleteComponent } from './components/delete/color-delete/color-delete.component';
import { LoginComponent } from './components/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { UserUpdateComponent } from './components/update/user-update/user-update.component';
import { PasswordUpdateComponent } from './components/update/password-update/password-update.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    CarComponent,
    RentalComponent,
    CarDetailComponent,
    CarFilterPipePipe,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    RentalAddComponent,
    PaymentComponent,
    PayComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    BrandUpdateComponent,
    ColorUpdateComponent,
    CarUpdateComponent,
    CarDeleteComponent,
    BrandDeleteComponent,
    ColorDeleteComponent,
    LoginComponent,
    RegisterComponent,
    UserUpdateComponent,
    PasswordUpdateComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
