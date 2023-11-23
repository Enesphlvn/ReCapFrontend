import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserUpdate } from 'src/app/models/userUpdate';
import { AuthService } from 'src/app/services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm: FormGroup = new FormGroup({});
  user: UserUpdate;
  userId!: number;
  email: string;
  firstName: string | null = null;
  lastName: string | null = null;

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}
 
  ngOnInit(): void {
    const token = localStorage.getItem('token');

    if (token != null) {
      if (!this.email) {
        try {
          const decoded: any = jwt_decode(token);
          this.email = decoded['email'];
        } catch (error) {}
      }
    }
    this.getByMail(this.email);
    this.createUserUpdateForm();
  }

  createUserUpdateForm() {
    this.userUpdateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  update() {
    if (this.userUpdateForm.valid) {
      let userModel = Object.assign({}, this.userUpdateForm.value);
      userModel.email = this.email;

      console.log(userModel);

      this.authService.update(userModel).subscribe((response) => {
        this.toastrService.success('İşlem başarıyla tamamlandı', 'Başarılı');
      });
    } else {
      this.toastrService.error('Lütfen tüm alanları doldurunuz', 'Dikkat!');
    }
  }

  getByMail(email: string) {
    this.authService.getByMail(email).subscribe((response) => {
      if (response) {
        const value = {
          firstName: response.firstName,
          lastName: response.lastName,
        };
        this.userUpdateForm.setValue(value);
      } else {
        this.toastrService.error('Bilgiler okunamadı');
      }
    });
  }
}
