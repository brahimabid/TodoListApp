import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map' ;
import { Http } from "@angular/http"
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:Http) { }
  createImg(image){
    return this.http.post("http://localhost:4500/user/upload",image).map(res=>{
      return res.json()
    })
  }

 verifUser(user){
    return this.http.post("http://localhost:4500/user/auth",user).map(res=>{
      return res.json()
    })
  }
  
  newUser(user){
    return this.http.post("http://localhost:4500/user/newUser",user).map(res=>{
      return res.json()
    })
  }
}
