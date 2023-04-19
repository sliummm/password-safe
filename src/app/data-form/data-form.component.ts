import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { User } from '../models/user';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent {
  accountData$:Observable<Account>;
  singleAccount:Account;
  newAccount:Partial<Account>;
  aid:Pick<Account, "aid">;
  userId:Pick<User, "uid">;
  newAccountType:Pick<Account, "accountType">;
  types = [
    {name: 'Google',value: 'google'},
    {name: 'Facebook',value: 'facebook'},
    {name: 'Twitter',value: 'twitter'},
    {name: 'Discord',value: 'discord'},
    {name: 'Other',value: 'other'}
  ]
  isOther = true;
  isUpdate=false;
  show = true;

  bannerMeaasge:string;

  accountForm:FormGroup = new FormGroup({
    type: new FormControl("", [Validators.required]),
    othertype: new FormControl("", [Validators.required]), 
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
    comment:new FormControl()
  })

  constructor(
    private accountCall: AccountService,
    private router: Router,
    private route:ActivatedRoute,
    private auth: AuthService,
    private _snackBar: MatSnackBar
    ){}

  ngOnInit(){
    this.aid={aid: Number(this.route.snapshot.paramMap.get("aid"))}
    this.isUpdate = this.aid.aid!=0;
    console.log("IsUpdate:"+this.isUpdate)
    this.userId={uid:this.auth.user.uid}
    if(this.isUpdate){
      this.accountCall.getAccountById(this.aid).subscribe(account=>{
        console.log(account[0])
        console.log(account[0].account_password)
        this.accountForm.controls.username.setValue(account[0].account_username);
        this.accountForm.controls.password.setValue(account[0].account_password);
        this.accountForm.controls.comment.setValue(account[0].account_comment);
        for(let type of this.types){
          if(type.value == account[0].account_type){
            this.isOther = false
          }
        }
        
        if(this.isOther){
          this.accountForm.controls.type.setValue('other');
          this.accountForm.controls.othertype.setValue(account[0].account_type);
        }else{
          this.accountForm.controls.type.setValue(account[0].account_type);
        }
      })
    }
  }

  compare(c1: {name: string}, c2: {name: string}) {
    return c1 && c2 && c1.name === c2.name;
  }

  onPassToggle(){
    this.show=!this.show;
  }

  onUpdate(){
    if(this.accountForm.value.type == 'other'){
      this.newAccountType = {accountType:this.accountForm.value.othertype};
    }else{
      this.newAccountType = {accountType:this.accountForm.value.type};
    }
    this.newAccount = {
      aid:this.aid.aid,
      accountType: this.newAccountType.accountType,
      accountUserName: this.accountForm.value.username,
      accountPassword: this.accountForm.value.password,
      accountComment:this.accountForm.value.comment
    }
    console.log(this.newAccount);
    this.accountCall.putAccount(this.newAccount).subscribe(response=>console.log(response))
    this._snackBar.open("Account Updated", "close");
    this.router.navigate(['/safe']);
  }

  onAdd(){
    if(this.accountForm.value.type == 'other'){
      this.newAccountType = {accountType:this.accountForm.value.othertype};
    }else{
      this.newAccountType = {accountType:this.accountForm.value.type};
    }
    this.newAccount = {
      accountType: this.newAccountType.accountType,
      accountUserName: this.accountForm.value.username,
      accountPassword: this.accountForm.value.password,
      accountComment:this.accountForm.value.comment
    }
    console.log(this.newAccount,this.userId)
    this.accountCall.postNewAccount(this.newAccount,this.userId).subscribe(response=>console.log(response))
    this._snackBar.open("Account added", "close")
    this.router.navigate(['/safe']);
  }

  onDelete(){
    this.accountCall.deleteAccount(this.aid).subscribe(response=>console.log(response))
    this._snackBar.open("Account deleted", "close")
    this.router.navigate(['/safe']);
  }


  onCancel(){
    this.router.navigate(['/safe']);
  }
}
