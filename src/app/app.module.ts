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
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarFilterPipePipe } from './pipes/car-filter-pipe.pipe';
import { BrandFilterPipePipe } from './pipes/brand-filter-pipe.pipe';
import { ColorFilterPipePipe } from './pipes/color-filter-pipe.pipe';
import { RentalAddComponent } from './components/add/rental-add/rental-add.component';

import { ToastrModule } from 'ngx-toastr';
import { CartSummaryComponent } from './components/cart-summary/cart-summary.component';
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

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    NaviComponent,
    CarComponent,
    RentalComponent,
    CarImageComponent,
    CarDetailComponent,
    CarFilterPipePipe,
    BrandFilterPipePipe,
    ColorFilterPipePipe,
    RentalAddComponent,
    CartSummaryComponent,
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
    LoginComponent
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
