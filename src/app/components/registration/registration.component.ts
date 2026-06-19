import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private router : Router){}

  registrationForm = new FormGroup({
      name:new FormControl('',Validators.required),
      email:new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',Validators.required)
    })

    onSubmit(){
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({...this.registrationForm.value,isLoggedIn:false});
      localStorage.setItem('users',JSON.stringify(users));
      this.registrationForm.reset()
      this.router.navigate(['/'])
    }
}
