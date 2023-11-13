import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-delete',
  templateUrl: './color-delete.component.html',
  styleUrls: ['./color-delete.component.css'],
})
export class ColorDeleteComponent implements OnInit {
  color: Color | null = null;
  colorId!: number;
  colorName: string;
  colorDeleteForm: FormGroup;
 
  constructor(
    private toastrService: ToastrService,
    private colorService: ColorService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.colorId = params['colorId'];
      this.getByColorId(params['colorId']);
      this.createColorDeleteForm();
    });
  }

  createColorDeleteForm() {
    this.colorDeleteForm = this.formBuilder.group({
      colorId: [this.colorId, Validators.required],
      colorName: [this.colorName, Validators.required],
    });
  }

  delete() {
    if (this.colorDeleteForm.valid) {
      this.colorService.delete(this.colorId).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Başarılı');
        },
        (responseError) => {
          this.toastrService.error(responseError.error);
        }
      );
    }
  }

  getByColorId(id: number) {
    this.colorService.getColorbyId(id).subscribe((response) => {
      this.color = response.data;
      this.colorId = this.color.colorId;
      this.colorName = this.color.colorName;

      this.colorDeleteForm.setValue(response.data);
    });
  }
}
