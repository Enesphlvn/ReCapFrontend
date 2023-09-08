import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  @Input() carId: number;
  carImages: CarImage[];

  constructor(
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.carId = +params['id']; 
      this.getCarImages(this.carId);
    })
  }
  getCarImages(carId: number) {
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }
}
