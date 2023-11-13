import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.css'],
})
export class CarDeleteComponent implements OnInit {
  car: Car | null = null;
  carId!: number;
  carName: string;
  carDeleteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = params['carId'];
      this.getCarById(params['carId']);
      this.createCarDeleteForm();
    });
  }
 
  createCarDeleteForm() {
    this.carDeleteForm = this.formBuilder.group({
      id: [this.carId, Validators.required],
      carName: [this.carName, Validators.required],
      brandName: ['', Validators.required],
      colorName: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      modelYear: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  delete() {
    if (this.carDeleteForm.valid) {
      this.carService.delete(this.carId).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }

  getCarById(id: number) {
    this.carService.getCarById(id).subscribe((response) => {
      this.car = response.data;

      if(!this.car){
        // router ile car list e yönlendir
      }
      this.carId = this.car.id;
      this.carName = this.car.carName;

      this.carDeleteForm.setValue(response.data);
    });
  }
}
