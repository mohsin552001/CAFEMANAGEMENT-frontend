import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatagoryService } from 'src/app/services/catagory.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalContants } from 'src/app/shared/global-contants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any;
  dialogAction: any = 'Add';
  action: any = 'Add';
  categories: any = [];

  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private dialogRef: MatDialogRef<ProductComponent>,
    private catagoryService: CatagoryService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    console.log(this.categories.value);
    this.productForm = this.formBuilder.group({
      name: [null, Validators.required],
      categoryName: [null, [Validators.required]],

      description: [null, Validators.required],
      price: [null, Validators.required],
    });
    if (this.dialogData.action == 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.productForm.patchValue(this.dialogData.data);
    }
    this.getcategories();
  }
  getcategories() {
    this.catagoryService.getCatagory().subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalContants.genericError;
        }
        this.snackbarService.openSnackbar(
          this.responseMessage,
          GlobalContants.error
        );
      }
    );
  }

  handleSubmit() {
    if (this.dialogAction == 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    let formValue = this.productForm.value;
    let data = {
      name: formValue.name,
      catagoryId: formValue.categoryName,
      price: formValue.price,
      description: formValue.description,
    };
    console.log(data.name);
    console.log(data.price);
    console.log(data.catagoryId);
    console.log(data.description);

    this.productService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddProduct.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, 'success');
      },
      (error: any) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalContants.genericError;
        }
        this.snackbarService.openSnackbar(
          this.responseMessage,
          GlobalContants.error
        );
      }
    );
  }

  edit() {
    let formValue = this.productForm.value;
    console.log(formValue.catagoryId);
    let data = {
      id: this.dialogData.data.id,
      name: formValue.name,
      catagoryId: formValue.catagoryId,

      price: formValue.price,
      description: formValue.description,
    };

    this.productService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditProduct.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, 'success');
      },
      (error: any) => {
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalContants.genericError;
        }
        this.snackbarService.openSnackbar(
          this.responseMessage,
          GlobalContants.error
        );
      }
    );
  }
}
