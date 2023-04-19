import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-safe',
  templateUrl: './safe.component.html',
  styleUrls: ['./safe.component.css']
})
export class SafeComponent {

  safeData$:Observable<Account[]>;
  userId:Pick<User,"uid">

  constructor(
    private accountService: AccountService,
    private auth: AuthService
    ){}

    ngOnInit(){
      this.userId = {uid: this.auth.user.uid}
      console.log(this.userId)
      this.safeData$ = this.accountService.getAllAccount(this.userId)
    }
}
