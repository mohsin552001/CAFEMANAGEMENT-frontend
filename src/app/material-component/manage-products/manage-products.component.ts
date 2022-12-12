import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {  MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalContants } from 'src/app/shared/global-contants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { ProductComponent } from '../dialog/product/product.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {
displayColumns:string[]=['name','categoryName','description','price','edit']
responseMessage:any
dataSource:any
  constructor(private productService:ProductService,private ngxUiloaderService:NgxUiLoaderService,private dailog:MatDialog,private snackbarService:SnackbarService,private router:Router) { }

  ngOnInit(): void {
    this.ngxUiloaderService.start()
    this.tableData()
    console.log(this.tableData())
  }
  tableData(){
    this.productService.getProducts().subscribe((response:any)=>{
      this.ngxUiloaderService.stop()
      this.dataSource=new MatTableDataSource(response)


    },(error:any)=>{
console.log(error)
this.ngxUiloaderService.stop()
if(error.error?.message){
  this.responseMessage=error.error?.message
}else{
  this.responseMessage=GlobalContants.genericError
}

this.snackbarService.openSnackbar(this.responseMessage,GlobalContants.error)
    })
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction(){
let dialogConfig=new MatDialogConfig()
dialogConfig.data={
  action:'Add'
}

dialogConfig.width='850px'
let dialogRef=this.dailog.open(ProductComponent,dialogConfig)
this.router.events.subscribe(()=>{
dialogRef.close()
})
let sub =dialogRef.componentInstance.onAddProduct.subscribe((response:any)=>{
  this.tableData()
})

  }

  handleEditAction(values:any){


    let dialogConfig=new MatDialogConfig()
dialogConfig.data={
  action:'Edit',
  data:values
}

dialogConfig.width='850px'
let dialogRef=this.dailog.open(ProductComponent,dialogConfig)
this.router.events.subscribe(()=>{
dialogRef.close()
})
let sub =dialogRef.componentInstance.onEditProduct.subscribe((response:any)=>{
  this.tableData()
})
  }

  handleDeleteAction(values:any){

    let dialogConfig=new MatDialogConfig()
dialogConfig.data={
message:'delete'+values.name+'product'
}
let dialogRef=this.dailog.open(ConfirmationComponent,dialogConfig)
let sub =dialogRef.componentInstance.onEmitStatusChange.subscribe((response:any)=>{
  this.ngxUiloaderService.start()
  this.deleteProduct(values.id)
  dialogRef.close()
})

  }

  deleteProduct(id:any){
    this.productService.delete(id).subscribe((response:any)=>{
      this.ngxUiloaderService.stop()
      this.tableData()
      this.responseMessage=response?.message
      this.snackbarService.openSnackbar(this.responseMessage,'success')
    },(error)=>{

      console.log(error)
      this.ngxUiloaderService.stop()
      if(error.error?.message){
        this.responseMessage=error.error?.message
      }else{
        this.responseMessage=GlobalContants.genericError
      }

      this.snackbarService.openSnackbar(this.responseMessage,GlobalContants.error)

    })

  }



  onChange(status:any,id:any){

    let data ={
      status:status.toString(),
      id:id
    }

    this.productService.updateStatus(data).subscribe((response:any)=>{
      this.ngxUiloaderService.stop()

      this.responseMessage=response?.message
      this.snackbarService.openSnackbar(this.responseMessage,'success')
    },(error)=>{

      console.log(error)
      this.ngxUiloaderService.stop()
      if(error.error?.message){
        this.responseMessage=error.error?.message
      }else{
        this.responseMessage=GlobalContants.genericError
      }

      this.snackbarService.openSnackbar(this.responseMessage,GlobalContants.error)

    })




  }
}


