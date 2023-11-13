import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Car } from '../models/car';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

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

  getCarById(id:number): Observable<SingleResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getbyid?id=' + id;
    return this.httpClient.get<SingleResponseModel<Car>>(newPath);
  }

  getBrandId(brandId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarbybrandid?brandId=' + brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getColorId(colorId: number): Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl + 'cars/getcarbycolorid?colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByBrandAndColor(brandId:number, colorId:number): Observable<ListResponseModel<Car>>{
    let newPath = this.apiUrl + 'cars/getcarbybrandandcolor?brandId=' + brandId + '&colorId=' + colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  add(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'cars/add';
    return this.httpClient.post<ResponseModel>(newPath, car);
  }

  update(car: Car): Observable<ResponseModel> {
    let newPath = this.apiUrl + 'cars/update';
    return this.httpClient.put<ResponseModel>(newPath, car);
  }

  delete(carId: number): Observable<ResponseModel>{
    let newPath = this.apiUrl + 'cars/delete?carId=' + carId;
    return this.httpClient.delete<ResponseModel>(newPath);
  }
}