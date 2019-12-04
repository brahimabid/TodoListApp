import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router'
@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.scss']
})
export class AuthentificationComponent implements OnInit {
  formLogin: FormGroup
  formRegister: FormGroup
  createAccount: boolean;
  constructor(private fb: FormBuilder, private serv: UserService, private router: Router) {
    this.formLogin = this.fb.group({

      mail: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],

    })
    this.formRegister = this.fb.group({

      mail: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required]],
      name: ['', [Validators.required]],
      img: ['', [Validators.required]]
    })
  }

  ngOnInit() {
    this.createAccount = false;
  }
  multiImage
  selectedM(event) {
    this.multiImage = event.target.files;

    console.log(this.multiImage)
  }
  gocreate() {
    this.createAccount = true
    this.message=''
  }
  saveNewUser() {
    
    const formData = new FormData();
    for (let img of this.multiImage)
      formData.append('myFiles', img)
    console.log(formData)
    this.serv.createImg(formData).subscribe(res => {

      let obj = this.formRegister.value
      obj.img = res
      this.createAccount = false;
      this.serv.newUser(obj).subscribe(res => {
        console.log(res)
      })
    })
  }
  User;
  aff = false;
  message: String;
  conctUser() {
    console.log(this.formLogin.valid)
    if (this.formLogin.valid) {
      this.serv.verifUser(this.formLogin.value).subscribe(res => {
        if (res.status == true) {
          localStorage.clear();
          localStorage.setItem('x-token', res.resultat);
          this.router.navigate(['todo'])

        } else {
          if (res.status==false)
            this.message = res.resultat;

        }
      })
    } else {

      this.message = "vellier verifier vos champs";
    }






  }
}
