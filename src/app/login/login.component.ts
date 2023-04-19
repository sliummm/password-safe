import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginFail:boolean;

  constructor(
    private auth: AuthService
    ){ }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  });

  login():void{
    this.auth.login({email: this.loginForm.value.email, password: this.loginForm.value.password}).subscribe(response=>{
      if(!response){
        this.loginFail=true
      }
    });
  }
}
