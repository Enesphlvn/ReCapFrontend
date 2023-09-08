import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CarImage } from '../models/carImage';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarImageService {
  apiUrl = 'https://localhost:7013/api/carImages/getimagesbycarid';

  constructor(private httpClient: HttpClient) {}

  getCarImages(carId: number): Observable<ListResponseModel<CarImage>> {
    return this.httpClient.get<ListResponseModel<CarImage>>(this.apiUrl + '?carId=' + carId);
  }
}
