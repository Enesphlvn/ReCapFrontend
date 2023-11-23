import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {

      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe(
        (response) => {
          if (response) {
            this.toastrService.success('Sisteme giriş başarılı');
            localStorage.setItem('token', response.token);
            this.router.navigateByUrl('/');
          } else {
            this.toastrService.error(response, 'Hata');
          }

        },
        (responseError) => {
          if (responseError.error) {
            this.toastrService.error(responseError.error);
          } else {
            this.toastrService.error('Lütfen tüm alanları doldurunuz', 'Dikkat!');
          }
        }
      );
    }
  }

  register() {
    this.router.navigateByUrl("register");
  }
}
