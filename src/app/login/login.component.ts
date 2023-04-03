import { Component, EventEmitter, Output } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output()
  onLogin = new EventEmitter();

  isLogin: boolean = false;
  currentUser:User = new User();

}
