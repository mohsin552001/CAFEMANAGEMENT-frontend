import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CatagoryService } from 'src/app/services/catagory.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalContants } from 'src/app/shared/global-contants';
import { CatagoryComponent } from '../dialog/catagory/catagory.component';

@Component({
  selector: 'app-managa-catagory',
  templateUrl: './managa-catagory.component.html',
  styleUrls: ['./managa-catagory.component.scss'],
})
export class ManagaCatagoryComponent implements OnInit {
  displayCoulmns: string[] = ['name', 'edit'];

  dataSource: any;
  responseMessage: any;
  constructor(
    private router: Router,
    private catagoryService: CatagoryService,
    private ngxUiLoaderService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.ngxUiLoaderService.start();
    this.tableData();
  }

  tableData() {
    this.catagoryService.getCatagory().subscribe(
      (response: any) => {
        this.ngxUiLoaderService.stop();

        this.dataSource = new MatTableDataSource(response);
      },
      (error) => {
        console.log(JSON.stringify(error));
        this.ngxUiLoaderService.stop();
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

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  handleAddAction() {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Add',
    };
    dialogConfig.width = '850px';
    let dialogRef = this.dialog.open(CatagoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    let sub = dialogRef.componentInstance.onAddCatagory.subscribe(
      (response: any) => {
        this.tableData();
      }
    );
  }
  handleEditAction(values: any) {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data:values
    };
    dialogConfig.width = '850px';
    let dialogRef = this.dialog.open(CatagoryComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    let sub = dialogRef.componentInstance.onEditCatagory.subscribe(
      (response: any) => {
        this.tableData();
      }
    );
  }
}
