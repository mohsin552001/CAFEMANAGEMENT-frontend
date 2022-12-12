import { Component } from '@angular/core';
import { MatchMedia } from '@angular/flex-layout/core/typings/match-media';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material-component/dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {
  role: any;
  constructor(private router: Router,
    private dialog: MatDialog) {

  }


  logOut(){
let dialogConfig=new MatDialogConfig
dialogConfig.data={
  message:'LogOut'
}
let dialogRef=this.dialog.open(ConfirmationComponent,dialogConfig)
let sub =dialogRef.componentInstance.onEmitStatusChange.subscribe((user)=>{
dialogRef.close()
localStorage.clear()
this.router.navigate(['/'])
})
  }



  changePassword(){
    let dialogConfig=new MatDialogConfig
    dialogConfig.width='550px'
    this.dialog.open(ChangePasswordComponent,dialogConfig)
  }
}
