import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorhandleService {

  handleError<T>(operation = "operation", result?: T){
    return (err: any):Observable<T> => {
      console.log(`${operation} failed: ${err}`);
      return of(result as T);
    };
  }
}
