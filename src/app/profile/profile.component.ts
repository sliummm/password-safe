import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginstatusService } from '../services/loginstatus.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileForm = new FormGroup({
    email: new FormControl(),
    phone: new FormControl(),
    company: new FormControl()
  })

  constructor(
    private userLoginStatus: LoginstatusService,
    private router: Router
  ){}

  onSubmit(){

  }

  onLogout(){
    this.userLoginStatus.logUserOut();
    this.router.navigate(['/'])
    console.log(this.userLoginStatus)
  }
}
