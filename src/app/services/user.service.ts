import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {
 urL=environment.apiUrl
  constructor(private httpClient:HttpClient) { }

signUp(data:any){
  return this.httpClient.post(this.urL+'/user/signup',data,{
    headers:new HttpHeaders().set('Content-Type','application/json')
  })
}



forgotPassword(data:any){
return this.httpClient.post(this.urL+'/user/forgotPassword',data,{
  headers:new HttpHeaders().set('Content-Type','application/json')
})
}


Login(data:any){
  return this.httpClient.post(this.urL+'/user/login',data,{
    headers:new HttpHeaders().set('Content-Type','application/json')}
  )
}

checkToken(){
  return this.httpClient.get(this.urL+'/user/checkToken')
}



changePassword(data:any){
return this.httpClient.post(this.urL+'/user/changePassword',data,{
  headers:new HttpHeaders().set('Content-Type','application/json')
})
}
}
