import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { GlobalContants } from '../shared/global-contants';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';
import jwt_decode from 'jwt-decode'
@Injectable({
  providedIn: 'root'
})
export class RouteGuardService {

  constructor(public authService:AuthService,private snackbarService:SnackbarService,public router:Router) { }

canActivate(route:ActivatedRouteSnapshot):boolean{
let expectedRoleArray=route.data;
expectedRoleArray=expectedRoleArray.expectedRole;
let token:any=localStorage.getItem('token')
var tokenpayload:any;
try{
  tokenpayload=jwt_decode(token)
}catch(err){
  localStorage.clear();

  this.router.navigate(['/'])
}


let checkRole=false;

for(let i=0; i<expectedRoleArray.length; i++){


  if(expectedRoleArray[i]==tokenpayload.role){
    checkRole =true
  }
}


if(tokenpayload.role=='user' || tokenpayload.role=='admin'){
  if(this.authService.isAuthenticate() && checkRole){
    return true
  }
  this.snackbarService.openSnackbar(GlobalContants.unauthorized,GlobalContants.error)
  this.router.navigate(['/'])
  return false
}else{

  this.router.navigate(['/'])
  localStorage.clear()
  return false
}
}

}


