import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent {
  isLogged:boolean=false;
  ngOnInit(){
    let users = JSON.parse(localStorage.getItem('users') || '[]')
    this.isLogged = users.some((user:any)=>user.isLoggedIn===true);
  }
}
