import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:7013/api/';
 
  constructor(private httpClient: HttpClient) {}

  getCars(): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getById(id: number): Observable<Car> {
    let newPath = this.apiUrl + 'cars/getbyid?id=' + id;
    return this.httpClient.get<Car>(newPath);
  }

  getBrandId(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarbybrandid?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getColorId(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarbycolorid?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
}