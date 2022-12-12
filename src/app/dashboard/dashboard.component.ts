import { Component, AfterViewInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DashboardService } from '../services/dashboard.service';

import { SnackbarService } from '../services/snackbar.service';
import { GlobalContants } from '../shared/global-contants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements AfterViewInit {
  responseMessage: any;
  data: any;
  ngAfterViewInit() {}

  constructor(
    private dashboardService:DashboardService,
    private ngxUiloaderService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {
    this.ngxUiloaderService.start();
    this.dashboardData();
  }

  dashboardData() {
    this.ngxUiloaderService.stop()
  this.dashboardService.getDetails().subscribe(
      (response: any) => {
        this.ngxUiloaderService.stop();
        this.data = response;
      },
      (error: any) => {
        this.ngxUiloaderService.stop();
        console.log(error);
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
