import { Component, OnInit, EventEmitter, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatagoryService } from 'src/app/services/catagory.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalContants } from 'src/app/shared/global-contants';

@Component({
  selector: 'app-catagory',
  templateUrl: './catagory.component.html',
  styleUrls: ['./catagory.component.scss'],
})
export class CatagoryComponent implements OnInit {
  onAddCatagory = new EventEmitter();
  onEditCatagory = new EventEmitter();
  catagoryForm: any;
  dialogAcion: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
forgotPasswordForm: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private catagoryService: CatagoryService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<CatagoryComponent>
  ) {}

  ngOnInit(): void {
    this.catagoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
    if (this.dialogData.dialog === 'Edit') {
      this.dialogAcion === 'Edit';
      this.action = 'Update';
      this.catagoryForm.patchValue(this.dialogData.data);
    }
  }
  handleSubmit() {
    if (this.dialogAcion == 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    let formValue = this.catagoryForm.value;
    let data = {
      name: formValue.name,
    };
    this.catagoryService.add(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddCatagory.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
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
    let formValue = this.catagoryForm.value;

    let data = {
      id: this.dialogData.data.id,
      name: formValue.name,
    };
    this.catagoryService.update(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditCatagory.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackbar(this.responseMessage, 'success');
      },
      (error) => {
        this.dialogRef.close();
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
