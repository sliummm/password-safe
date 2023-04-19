import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls['password'];
      const repass = formGroup.controls['repass'];

      if (password && repass && password.value !== repass.value) {
        repass.setErrors({ passwordMismatch: true });
      } 

      return null;
    }
  }
}
