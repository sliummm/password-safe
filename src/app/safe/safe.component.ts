import { Component } from '@angular/core';

@Component({
  selector: 'app-safe',
  templateUrl: './safe.component.html',
  styleUrls: ['./safe.component.css']
})
export class SafeComponent {

  codes = [
    {
      title:"Google",
      userName:"test",
      passWord:"test123"
    },
    {
      title:"facebook",
      userName:"test2",
      passWord:"test1234"
    },
    {
      title:"twiter",
      userName:"test3",
      passWord:"test125"
    },
    {
      title:"twiter",
      userName:"test3",
      passWord:"test125"
    },
    {
      title:"twiter",
      userName:"test3",
      passWord:"test125"
    },
    {
      title:"twiter",
      userName:"test3",
      passWord:"test125"
    },
  ]
}
