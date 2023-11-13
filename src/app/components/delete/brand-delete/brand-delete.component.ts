import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.css'],
})
export class BrandDeleteComponent implements OnInit {
  brand: Brand | null = null;
  brandId!: number;
  brandName: string;
  brandDeleteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.brandId = params['brandId'];
      this.getBrandById(params['brandId']);
      this.createBrandDeleteForm();
    });
  }

  createBrandDeleteForm() {
    this.brandDeleteForm = this.formBuilder.group({
      brandId: [this.brandId, Validators.required],
      brandName: [this.brandName, Validators.required],
    });
  }

  delete() {
    if (this.brandDeleteForm.valid) {
      this.brandService.delete(this.brandId).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }

  getBrandById(id: number) {
    this.brandService.getBrandById(id).subscribe((response) => {
      this.brand = response.data;
      this.brandId = this.brand.brandId;
      this.brandName = this.brand.brandName;

      this.brandDeleteForm.setValue(response.data);
    });
  }
}
