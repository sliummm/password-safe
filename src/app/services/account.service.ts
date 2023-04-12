import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Account } from '../models/account'
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private url = "http://localhost:4242/accounts";

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(private http: HttpClient) { }

  getAllAccount(user:User){
    return this.http.get<any>(`${this.url}/${user.uid}`)
  }

  getAccountById(account:Account){
    return this.http.get<any>(`${this.url}/useraccount/${account.aid}`);
  }

  postNewAccount(account: Account){
    const body = {
      "userid":account.userid,
      "account_type":account.accountType,
      "account_username":account.accountUserName,
      "account_password":account.accountPassword,
      "account_comment":account.accountComment
    }

    return this.http.post(this.url, body, {'headers': this.httpOptions.headers});
  }

  putAccount(account:Account){
    const body = {
      "aid": account.aid,
      "account_type": account.accountType,
      "account_username": account.accountUserName,
      "account_password": account.accountPassword,
      "account_comment": account.accountComment
    }

    return this.http.put(`${this.url}/${account.aid}`,body, {'headers': this.httpOptions.headers});
  }

  deleteAccount(account:Account){
    return this.http.delete(`${this.url}/${account.aid}`)
  }
}
