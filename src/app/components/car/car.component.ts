import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carImages: CarImage[] = [];
  detailModel: any;
  selectedCarId: number;

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandId(params['brandId']);
      } else if (params['colorId']) {
        this.getColorId(params['colorId']);
      } else {
        this.getCars();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getBrandId(brandId: number) {
    this.carService.getBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getColorId(colorId: number) {
    this.carService.getColorId(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  detail(id: number): void {
    this.carService.getById(id).subscribe((response: any) => {
      this.detailModel = response.data;
    });

    this.getCarImages(id);
    this.router.navigate(['/cars', id]);
  }

  getCarImages(carId: number) {
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  onCarClick(carId:number){
    this.selectedCarId = carId;
  }
}
