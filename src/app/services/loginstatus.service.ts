import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginstatusService {

  constructor() { }

  private isLogin: ReplaySubject<boolean> = new ReplaySubject<boolean>();

  public logUserIn(){
    this.isLogin.next(true);
  }

  public logUserOut(){
    this.isLogin.next(false);
  }

  public getLoginStatus(): Observable<boolean>{
    return this.isLogin.asObservable();
  }
}
