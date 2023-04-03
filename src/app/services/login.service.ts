import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:4242/users";

  httpOptions: {headers: HttpHeaders} = {
    headers: new HttpHeaders({"Content-Type": "application/json"})
  }

  constructor(private http: HttpClient) { }

  getUserInfo(user:User){
    return this.http.get<any>(`${this.url}/userinfo/${user.username}`,{responseType:"json"})
  }

  getPassword(user:User){
    return this.http.get<any>(`${this.url}/${user.username}`,{responseType:"json"})
  }

  post(user:User){
    const body = {
      "username":user.username,
      "email": user.email,
      "company": user.company,
      "password":user.password
    }

    return this.http.post(this.url, body, {'headers': this.httpOptions.headers});
  }

  put(user:User){
    const body = {
      "uid": user.uid,
      "username": user.username,
      "email": user.email,
      "company": user.company,
      "password": user.password,
    }

    return this.http.put(`${this.url}/${user.uid}`, body, {'headers': this.httpOptions.headers});
  }

}
