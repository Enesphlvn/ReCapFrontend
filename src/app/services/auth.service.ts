import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { HttpClient } from '@angular/common/http';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterModel } from '../models/registerModel';
import { UserUpdate } from '../models/userUpdate';
import { ResponseModel } from '../models/responseModel';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { PasswordUpdate } from '../models/passwordUpdate';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:7013/api/auth/';

  constructor(private httpClient: HttpClient) {}

  login(loginModel: LoginModel) {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<TokenModel>(newPath, loginModel);
  }

  register(registerModel: RegisterModel){
    let newPath = this.apiUrl + 'register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(newPath, registerModel);
  }

  update(userUpdateModel: UserUpdate){
    let newPath = this.apiUrl + 'update';
    return this.httpClient.put<ResponseModel>(newPath, userUpdateModel);
  }

  getByMail(email:string): Observable<any>{
    let newPath = this.apiUrl + 'getbymail?email=' + email;
    return this.httpClient.get<any>(newPath);
  }

  passwordUpdate(passwordUpdateModel: PasswordUpdate){
    let newPath = this.apiUrl + 'updatepassword';
    return this.httpClient.put<ResponseModel>(newPath, passwordUpdateModel);
  }

  isAuthenticated() {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      return false;
    }
  }
}
