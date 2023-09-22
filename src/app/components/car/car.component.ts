import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  brands:Brand[] = [];
  colors:Color[] = [];
  carImages: CarImage[] = [];
  brandFilter:number;
  colorFilter:number;
  detailModel: any;
  selectedCarId: number;
  dataLoaded = false;
  filterText = "";

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorService: ColorService,
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
        this.getBrands();
        this.getColors();
      }
    });
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
      this.dataLoaded = true;
    });
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
      this.dataLoaded = true;
    });
  }

  getCarImages(carId: number) {
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
      this.dataLoaded = true;
    });
  }

  getBrandId(brandId: number) {
    this.carService.getBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getColorId(colorId: number) {
    this.carService.getColorId(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarByBrandAndColor(brandId:number, colorId:number){
    this.carService.getCarByBrandAndColor(brandId, colorId).subscribe((response) =>{
      this.cars = response.data;
      this.dataLoaded = true;
    })
  }

  detail(id: number): void {
    this.carService.getById(id).subscribe((response: any) => {
      this.detailModel = response.data;
      this.dataLoaded = true;
    });

    this.getCarImages(id);
    this.router.navigate(['/cars', id]);
  }

  onCarClick(carId:number){
    this.selectedCarId = carId;
  }

  clearFilters(){
    this.getCars();
    this.brandFilter = 0;
    this.colorFilter = 0;
  }
}
