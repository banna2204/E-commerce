import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router : Router){}

  loginForm = new FormGroup({
    email:new FormControl(''),
    password:new FormControl('')
  })

  onSubmit(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const emailExist = users.some((u:any)=>u.email === this.loginForm.get('email')?.value) 
    const passCorrect = users.some((u:any)=>u.password === this.loginForm.get('password')?.value)
    if(!emailExist || !passCorrect){
      return alert('credentials wrong!!')
    }
    let user = users.find((user:any)=>user.email == this.loginForm.get('email')?.value)
    if(user){
      user.isLoggedIn = true;
    }
    localStorage.setItem('users',JSON.stringify(users))
    this.router.navigate(['/home'])
  }
}
