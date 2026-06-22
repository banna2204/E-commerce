import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { trimValidator } from 'src/app/trim-validator';
import { User } from 'src/app/user';

function validationSequence(validators: ValidatorFn[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    for (const validator of validators) {
      if (validator(control)) {
        return validator(control);
      }
    }
    return null;
  }
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private router: Router) { }

  registrationForm = new FormGroup({
    name: new FormControl('', validationSequence([Validators.required, Validators.minLength(3), trimValidator()])),
    email: new FormControl('', validationSequence([Validators.required, Validators.email, trimValidator()])),
    password: new FormControl('', validationSequence([Validators.required, Validators.minLength(6), trimValidator()]))
  })

  onSubmit() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existEmail = users.some((user: User) => user.email === this.registrationForm.get('email')?.value)
    if (existEmail) {
      return alert('user already exist!!')
    }
    users.push({ ...this.registrationForm.value, isLoggedIn: false });
    localStorage.setItem('users', JSON.stringify(users));
    this.registrationForm.reset()
    this.router.navigate(['/'])
  }
}
