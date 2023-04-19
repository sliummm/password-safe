import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Account } from '../models/account'
import { User } from '../models/user';
import { AuthService } from './auth.service';
import { catchError, Observable } from 'rxjs';
import { ErrorhandleService } from './errorhandle.service';
import { __values } from 'tslib';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = "http://localhost:4242/accounts";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(
    private http: HttpClient,
    private errorhandler: ErrorhandleService
    ) { }

  getAllAccount({uid}: Pick<User,"uid">):Observable<Account[]>{
    console.log(this.url+uid)
    return this.http.get<Account[]>(`${this.url}/${uid}`,{responseType: "json"})
    .pipe(
      catchError(this.errorhandler.handleError<Account[]>("fetchAll", []))
    )
  }

  getAccountById(aid:Pick<Account,"aid">):Observable<Account>{
    console.log(Object.values(aid))
    return this.http.get<Account>(`${this.url}/useraccount/${Object.values(aid)}`,{responseType: "json"})
    .pipe(
      catchError(this.errorhandler.handleError<Account>("fetchById"))
    )
  }

  postNewAccount(
    formData: Partial<Account>,
    userid: Pick<User, "uid">
  ):Observable<Account>{
    console.log(this.url)

    return this.http.post<Account>(this.url, {
      userid:userid.uid,
      account_type:formData.accountType,
      account_username:formData.accountUserName,
      account_password:formData.accountPassword,
      account_comment:formData.accountComment
    }, this.httpOptions)
    .pipe(
      catchError(this.errorhandler.handleError<Account>("postAccount"))
    );
  }

  putAccount(account:Partial<Account>):Observable<any>{

    return this.http.put(`${this.url}/${account.aid}`,{
      aid: account.aid,
      account_type: account.accountType,
      account_username: account.accountUserName,
      account_password: account.accountPassword,
      account_comment: account.accountComment
    }, {'headers': this.httpOptions.headers})
    .pipe(
      catchError(this.errorhandler.handleError<Account>("putAccount"))
    );
  }

  deleteAccount(aid:Pick<Account, "aid">):Observable<{}>{
    return this.http.delete(`${this.url}/${aid.aid}`)
    .pipe(
      catchError(this.errorhandler.handleError<Account>("deleteAccount"))
    )
  }
}
