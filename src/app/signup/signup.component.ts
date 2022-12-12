import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalContants } from '../shared/global-contants';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signUpform:any;
  responseMessage:any
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService:UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<SignupComponent>,
    private ngxUiLoaderservice: NgxUiLoaderService

  ) {}

  ngOnInit(): void {
    this.signUpform = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalContants.nameRegex)],
      ],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }



  handleSubmit(){
    this.ngxUiLoaderservice.start()

    let  formValue=this.signUpform.value
    let data={
      name:formValue.name,
      email:formValue.email,
      contactNumber:formValue.contactNumber,
      password:formValue.password
    }
    this.userService.signUp(data).subscribe((response:any)=>{
      this.ngxUiLoaderservice.stop()
      this.dialogRef.close()
      this.responseMessage=response?.message;
      this.snackbarService.openSnackbar(this.responseMessage,"")
      this.router.navigate(['/'])

    },(error)=>{
      this.ngxUiLoaderservice.stop()
      if(error.error?.message){
        this.responseMessage=error.error?.message
      }else{
        this.responseMessage=GlobalContants.genericError
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalContants.error)
    })
  }
}
