import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private router : Router){}

  isLogged:boolean=false;
  user:any;
  ngDoCheck(){
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    this.isLogged = users.some((user:any)=> user.isLoggedIn===true );
    this.user = users.filter((user:any)=>user.isLoggedIn===true)
  }

  logout(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    let user = users.filter((user:any)=>user.email == this.user[0].email)
    if(user){
      user[0].isLoggedIn = false;
    }
    localStorage.setItem('users',JSON.stringify(users))
    this.router.navigate(['/'])
  }
}
