import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css'],
})
export class BrandUpdateComponent implements OnInit {
  brandUpdateForm: FormGroup = new FormGroup({});
  brand: Brand | null = null;
  brandId!: number;
  brandName: string | null = null;
  
  constructor(
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.brandId = params['brandId'];
      this.getBrandById(params['brandId']);
      this.createBrandUpdateForm();
    });
  }
 
  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      brandId: [this.brandId, Validators.required],
      brandName: ['', Validators.required],
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let brandModel = Object.assign({}, this.brandUpdateForm.value);
      this.brandService.update(brandModel).subscribe(
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
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'Doğrulama Hatası'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Lütfen tüm alanları doldurunuz', 'Dikkat!');
    }
  }

  getBrandById(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.brandId = this.brand.brandId;
      this.brandName = this.brand.brandName;

      this.brandUpdateForm.setValue(response.data);
    });
  }
}
