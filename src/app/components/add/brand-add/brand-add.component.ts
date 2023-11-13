import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BrandService } from 'src/app/services/brand.service';
 
@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService:BrandService
  ) {}

  ngOnInit(): void {
    this.createbrandAddForm();
  }

  createbrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required]
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,'Doğrulama Hatası');
            }
          }
        }
      );
    } else {
      this.toastrService.error('Lütfen tüm alanları doldurunuz', 'Dikkat!');
    }
  }
}
