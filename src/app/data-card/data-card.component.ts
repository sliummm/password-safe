import { Component, Input } from '@angular/core';
import { Account } from '../models/account';

@Component({
  selector: 'app-data-card',
  templateUrl: './data-card.component.html',
  styleUrls: ['./data-card.component.css']
})
export class DataCardComponent {
  @Input() code:Account;
  account:any;

  ngOnInit(){
    this.account = this.code;
  }

  onClickCard(){
    
  }
}
