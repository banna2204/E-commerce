import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router : Router){}
  
    isLogged:boolean=false;
    user:any;
    users:any;
    ngDoCheck(){
      this.users = JSON.parse(localStorage.getItem('users') || '[]')
      this.isLogged = this.users.some((user:any)=> user.isLoggedIn===true );
      this.user = this.users.find((user:any)=>user.isLoggedIn===true)
    }

    logout(){
      let user = this.users.find((user:any)=>user.email == this.user.email)
      if(user){
        user.isLoggedIn = false;
      }
      localStorage.setItem('users',JSON.stringify(this.users))
      this.router.navigate(['/'])
    }
}
