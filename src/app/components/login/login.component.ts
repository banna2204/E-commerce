import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trimValidator } from 'src/app/trim-validator';
import { User } from 'src/app/user';

function validatorSequence(validators :ValidatorFn[]) : ValidatorFn {
  return (control : AbstractControl) : ValidationErrors | null => {
    for(const validator of validators){
      if(validator(control)){
        return validator(control);
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router) { }

  loginForm = new FormGroup({
    email: new FormControl('', validatorSequence([Validators.required,Validators.email,trimValidator()])),
    password: new FormControl('', validatorSequence([Validators.required,trimValidator()]))
  })

  onSubmit() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExist = users.some((u: User) => u.email === this.loginForm.get('email')?.value)
    const passCorrect = users.some((u: User) => u.password === this.loginForm.get('password')?.value)
    if (!emailExist || !passCorrect) {
      return alert('credentials wrong!!')
    }
    let user = users.find((user: User) => user.email == this.loginForm.get('email')?.value)
    if (user) {
      user.isLoggedIn = true;
    }
    localStorage.setItem('users', JSON.stringify(users))
    this.router.navigate(['/home'])
  }
}