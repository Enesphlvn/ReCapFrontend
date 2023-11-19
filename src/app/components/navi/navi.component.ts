import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment';
import { PaymentService } from 'src/app/services/payment.service';
import jwt_decode from "jwt-decode";
import { Subscription, interval } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit, OnDestroy {
  payments: Payment[];
  loginCheck = false;
  subscription: Subscription
  name = "";

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.subscription = interval(500).subscribe(() => {
      this.check();
    });
    this.getPayments();
  }

  ngOnDestroy() {
    // Bileşen yok edildiğinde aboneliği iptal et
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  check() {
    const token = localStorage.getItem('token');

    if (token != null) {
      this.loginCheck = true;
    }
    else
      return;

    if (this.loginCheck) {
      if (!this.name) {
        try {
          const decoded: any = jwt_decode(token);
          this.name = decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"]
        } catch (error) {
        }
      }
    }
  }

  DecodeToken(token: string): string {
    return jwt_decode(token);
  }

  getPayments() {
    this.paymentService.getPayments().subscribe((response) => {
      this.payments = response.data;
    })
  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigateByUrl("login")
    this.loginCheck = false;
    this.name = "";
    this.toastrService.info("Sistemden çıkış yapıldı")
  }

  updateProfile(){
    this.router.navigateByUrl('update')
  }

  updatePassword(){
    this.router.navigateByUrl('updatepassword')
  }
}
