import { Injectable } from '@angular/core';

import { Http, RequestOptions ,Headers} from '@angular/http';
import {Router,CanActivate} from'@angular/router'
import {JwtHelper, tokenNotExpired} from 'angular2-jwt'
@Injectable({
  providedIn: 'root'
})
export class AccessUserService {
decoded;
  constructor(private router:Router,private http:Http) { }
  islogged(){
  
    let token=localStorage.getItem('x-token');
    console.log(tokenNotExpired(token))
    if(!token)
    return false;
    
    let jwtHelper=new JwtHelper();
    let expirationdate=jwtHelper.getTokenExpirationDate(token);
    let isExpiredToken=jwtHelper.isTokenExpired(token)
       console.log("date"+ expirationdate);
       console.log("isexpired"+ isExpiredToken);
       return !isExpiredToken;
  }
  
  currentUser(){
    var jwtHelper: JwtHelper = new JwtHelper();
        let token=localStorage.getItem('x-token');
        
        //if(!token) {this.router.navigate([''])}
        
         return this.decoded=jwtHelper.decodeToken(token);
        
  
  }
  
  logOut(){
    localStorage.removeItem('x-token');
    this.router.navigate(['']);
  }
   
  optionHeader() : RequestOptions{
    let token=localStorage.getItem('x-token');
    let headers=new Headers();
    headers.append('x-token',token);
    let options=new RequestOptions({ headers :headers});
    return options
  }
  newNote(note){
    
      return this.http.post("http://localhost:4500/note/newNote",note,this.optionHeader()).map(res=>{
        return res.json()
      })
       
    
  }
  Notes(){
    
    return this.http.get("http://localhost:4500/note/",this.optionHeader()).map(res=>{
      return res.json()
    })
     
  
}
saveNote(note,id){
    
  return this.http.put("http://localhost:4500/note/update/"+id,note,this.optionHeader()).map(res=>{
    return res.json()
  })
   

}
  
}
