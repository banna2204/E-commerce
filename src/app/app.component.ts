import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLogged:boolean=false;
  ngDoCheck(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    this.isLogged = users.some((user:any)=>user.isLoggedIn===true);
    console.log(this.isLogged)
  }
}
