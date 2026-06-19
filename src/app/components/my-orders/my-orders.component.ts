import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  isEmpty:boolean=false;
  localProducts:any;
  ngOnInit(){
    this.localProducts = JSON.parse(localStorage.getItem('products') || '[]');
    if(!this.localProducts){
      this.isEmpty=true
    }
  }
}
