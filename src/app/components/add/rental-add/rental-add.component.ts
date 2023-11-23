import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rental-add',
  templateUrl: './rental-add.component.html',
  styleUrls: ['./rental-add.component.css'],
})
export class RentalAddComponent implements OnInit {
  rentalAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private rentalService: RentalService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createRentalAddForm();
  }

  createRentalAddForm() {
    this.rentalAddForm = this.formBuilder.group({
      carId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
      customerId: ['', Validators.required],
    });
  }

  add() {
    if (this.rentalAddForm.valid) {
      const rental: Rental = { ...this.rentalAddForm.value }; // Klonlama operatörü kullanımı

      this.rentalService.addRental(rental).subscribe(
        () => {
          this.toastrService.success('Başarılı');
          this.router.navigate(['/payments/pay']);
        },
        (errorResponse) => {
          const errorMessage = errorResponse.error.message || 'Bir hata oluştu';
          this.toastrService.error(errorResponse.error.message, 'Hata');
        }
      );
    } else {
      this.toastrService.error('Lütfen tüm alanları doldurunuz.', 'Hata!');
    }
  }
}
