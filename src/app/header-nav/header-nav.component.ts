import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginstatusService } from '../services/loginstatus.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.css']
})
export class HeaderNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  isAuthed = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService
  ) { }

  ngOnInit():void{
    this.auth.isUserLoggedIn$.subscribe(
      (isLoggedIn)=>{
        this.isAuthed = isLoggedIn;
      }
    )
  }
}
