import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PasswordUpdate } from 'src/app/models/passwordUpdate';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from "jwt-decode";
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-update',
  templateUrl: './password-update.component.html',
  styleUrls: ['./password-update.component.css']
})
export class PasswordUpdateComponent implements OnInit {

  passwordUpdateForm: FormGroup = new FormGroup({})
  password: PasswordUpdate;
  email: string;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token != null) {
      if (!this.email) {
        try {
          const decoded: any = jwt_decode(token);
          this.email = decoded["email"]
        } catch (error) {
        }
      }
    }
    this.createUpdatePasswordForm();
  }

  createUpdatePasswordForm() {
    this.passwordUpdateForm = this.formBuilder.group({
      oldPassword: ["", Validators.required],
      newPassword: ["", Validators.required],
      secondNewPassword: ["", Validators.required]
    })
  }

  updatePassword() {
    if (this.passwordUpdateForm.valid) {
      let passwordModel = Object.assign({}, this.passwordUpdateForm.value);
      console.log(passwordModel)
      if (passwordModel.newPassword != passwordModel.secondNewPassword) {
        this.toastrService.error('Şifre tekrarı hatalı', "Hata");
        return;
      }

      const request = {
        email: this.email,
        oldPassword: passwordModel.oldPassword,
        newPassword: passwordModel.newPassword
      }

      this.authService.passwordUpdate(request).subscribe((response) => {

        this.toastrService.success("Güncelleme işlemi başarılı");

        this.logOut();
      })
    } else {
      this.toastrService.error('Lütfen tüm alanları doldurunuz', 'Dikkat!');
    }
  }

  logOut() {
    localStorage.removeItem('token')
    this.router.navigateByUrl("login")
    this.toastrService.warning("Sisteme tekrar giriş yapın")
  }
}
