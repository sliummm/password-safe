import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

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

  currentUser:User;

  constructor(
    private auth: AuthService,
    private router: Router
  ){}

  ngOnInit(){
    this.currentUser = this.auth.user
    console.log(this.currentUser)
  }

  onLogout(){
    this.auth.isUserLoggedIn$.next(false)
    this.router.navigate(['/'])
  }
}
