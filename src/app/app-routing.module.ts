import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { PayComponent } from './components/pay/pay.component';
import { RentalAddComponent } from './components/add/rental-add/rental-add.component';
import { RentalComponent } from './components/rental/rental.component';
import { PaymentComponent } from './components/payment/payment.component';
import { BrandAddComponent } from './components/add/brand-add/brand-add.component';
import { ColorAddComponent } from './components/add/color-add/color-add.component';
import { CarAddComponent } from './components/add/car-add/car-add.component';
import { BrandUpdateComponent } from './components/update/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorUpdateComponent } from './components/update/color-update/color-update.component';
import { CarUpdateComponent } from './components/update/car-update/car-update.component';
import { CarDeleteComponent } from './components/delete/car-delete/car-delete.component';
import { BrandDeleteComponent } from './components/delete/brand-delete/brand-delete.component';
import { ColorDeleteComponent } from './components/delete/color-delete/color-delete.component';
import { LoginComponent } from './components/login/login.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/add', component: CarAddComponent, canActivate:[LoginGuard] },
  { path: 'cars/delete/:carId', component: CarDeleteComponent, canActivate:[LoginGuard] },
  { path: 'cars/:id', component: CarDetailComponent },
  { path: 'payments/pay', component: PayComponent },
  { path: 'payments/getall', component: PaymentComponent },
  { path: 'rentals/add', component: RentalAddComponent, canActivate:[LoginGuard] },
  { path: 'brands/add', component: BrandAddComponent, canActivate:[LoginGuard] },
  { path: 'brands/delete/:brandId', component: BrandDeleteComponent, canActivate:[LoginGuard] },
  { path: 'cars/update/:carId', component: CarUpdateComponent, canActivate:[LoginGuard]},
  { path: 'cars/brand/update/:brandId', component: BrandUpdateComponent, canActivate:[LoginGuard] },
  { path: 'cars/color/update/:colorId', component: ColorUpdateComponent, canActivate:[LoginGuard]},
  { path: 'colors/add', component: ColorAddComponent, canActivate:[LoginGuard] },
  { path: 'colors/delete/:colorId', component: ColorDeleteComponent, canActivate:[LoginGuard] },
  { path: 'rentals', component: RentalComponent },
  { path: 'cars', component: CarComponent },
  { path: 'brands/list', component: BrandComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
