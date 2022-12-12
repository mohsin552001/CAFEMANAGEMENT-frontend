import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { UserService } from '../services/user.service';
import { GlobalContants } from '../shared/global-contants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any;
  responseMessage: any;
  constructor(
    private formBuilder: FormBuilder,
    private userServices: UserService,
    private router: Router,
    private ngxLoaderUiService: NgxUiLoaderService,
    private dialogRef: MatDialogRef<LoginComponent>,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  handleSubmit() {
    this.ngxLoaderUiService.start();
    let formValue = this.loginForm.value;
    let data = {
      email: formValue.email,
      password: formValue.password,
    };

    this.userServices.Login(data).subscribe(
      (response: any) => {
        this.ngxLoaderUiService.stop();
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        alert(666)

        this.router.navigate(['cafe/dashboard']);
      },
      (error) => {
        alert('eerrr')
        this.ngxLoaderUiService.stop();
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
