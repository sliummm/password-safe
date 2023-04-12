import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, catchError, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { ErrorhandleService } from './errorhandle.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:4242/auth";
  isUserLoggedIn$ = new BehaviorSubject<boolean>(false);
  uid!: Pick<User, 'uid'>;


  httpOptions:{
    headers: HttpHeaders
  }={
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorhandleService,
    private router: Router) { }

  signup(user: Omit<User, "uid">): Observable<User>{
    return this.http.post<User>(`${this.url}/signup`, user, this.httpOptions).pipe(
      first(),
      catchError(this.errorHandlerService.handleError<User>('signup'))
    )
  }

  login({email,password}:Pick<User,"email" | "password">): Observable<{ token: string; uid: Pick<User, "uid">; }> {
    console.log(email+password)
    return this.http.post(`${this.url}/login`, { email, password }, this.httpOptions)
    .pipe(
      first(),
      tap(
        (tokenObject:any)=>{
          this.uid=tokenObject.uid;
          localStorage.setItem('token', tokenObject.token);
          this.isUserLoggedIn$.next(true);
          this.router.navigate(['/']);
          console.log(email);
          console.log(password);
        }
      ),
      catchError(
        this.errorHandlerService.handleError<{
          token: string;
          uid: Pick<User, "uid">;
        }>("login")
      )
    )
  }
}
