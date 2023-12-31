import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  @Input() carId: number;
  carImages: CarImage[];
  imageUrl = 'https://localhost:7013/uploads/images/';
  car: any;
  dataLoaded = false;

  constructor(
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = +params['id'];
      this.getCarImages(this.carId);
      if (params['id']) {
        this.getCarById(params['id']);
      }
    });
  }

  getCarImages(carId: number) {
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  getCarById(id: number) {
    this.carService.getById(id).subscribe((response: any) => {
      this.car = response.data;
      this.dataLoaded = true;
    });
  }

  getImagePath(carImage: CarImage) {
    let path = carImage.imagePath;
    return path;
  }

  rentNow(car: Car) {
    this.router.navigate(['rentals/add']);
  }
}
