import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  accountData$:Observable<Account>;
  aid:Pick<Account, "aid">;

  constructor(
    private account: AccountService,
    private router: Router,
    private route:ActivatedRoute
    ){}

  ngOnInit(){
    if(!this.route.snapshot){
      this.aid=null;
    }else{
      this.aid={aid: Number(this.route.snapshot.paramMap.get("aid"))}
    }

    if (this.aid!=null) {
      this.accountData$ = this.account.getAccountById(this.aid);
    }
  }

  onCancel(){
    this.router.navigate(['/safe']);
  }
}
