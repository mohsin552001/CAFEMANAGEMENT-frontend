import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalContants } from '../shared/global-contants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
forgotPasswordForm:any;
responseMessage:any;
  constructor(private userService:UserService,private dialogRef:MatDialogRef<ForgotPasswordComponent>,private ngxUiloaderService:NgxUiLoaderService,private snackbarService:SnackbarService,private formBuilder:FormBuilder) { }

  ngOnInit(): void {

    this.forgotPasswordForm=this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    })
  }


  handleSubmit(){
    this.ngxUiloaderService.start()
    let formValue=this.forgotPasswordForm.value
    let data={
      email:formValue.email


    }


    this.userService.forgotPassword(data).subscribe((response:any)=>{
      this.ngxUiloaderService.stop()
      this.responseMessage=response?.message
      this.dialogRef.close()
      this.snackbarService.openSnackbar(this.responseMessage,'')

    },(error)=>{
      this.ngxUiloaderService.stop()
      if(error.error?.message){
        this.responseMessage=error.error?.message
      }else{
        this.responseMessage=GlobalContants.genericError;
      }
      this.snackbarService.openSnackbar(this.responseMessage,GlobalContants.genericError)
    })
  }
}
