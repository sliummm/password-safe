import { Component } from '@angular/core';
import { LoginstatusService } from './services/loginstatus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_exercise';
  userid = '';
  constructor(){}
}
