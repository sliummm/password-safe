import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup = new FormGroup({
    username: new FormControl("",[Validators.required, Validators.minLength(2)]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required, Validators.minLength(7)]),
    repass: new FormControl("", [Validators.required, Validators.minLength(7)]),
    company: new FormControl()
  });

  constructor(private auth: AuthService, private router: Router){}

  onSubmit(){
    this.auth.signup(this.signupForm.value).subscribe((msg)=>{console.log(msg)})
    console.log(this.signupForm.value)
    this.router.navigate(['/login'])
  }

}
