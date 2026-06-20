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
  dataSource:any;
  totalPrice:number=0;
  product:any;
    ngOnInit(){
    this.localProducts = JSON.parse(localStorage.getItem('products') || '[]');
    if(this.localProducts.length==0){
      this.isEmpty=true
    }
    this.dataSource = this.localProducts;
    for(let i=0;i<this.localProducts.length;i++){
      this.totalPrice += this.localProducts[i].price * this.localProducts[i].quantity;
    }
  }
  displayedColumns:string[]=['title','quantity','price']

  decreaseQuantity(id:number){
    this.product = this.localProducts.find((p:any)=>p.id===id)
    if(this.product.quantity>1){
      this.product.quantity -= 1;
      localStorage.setItem('products',JSON.stringify(this.localProducts));
      this.totalPrice -= this.product.price;
    }
  }

  increaseQuantity(id:number){
    this.product = this.localProducts.find((p:any)=>p.id===id)
    this.product.quantity += 1;
    localStorage.setItem('products',JSON.stringify(this.localProducts));
    this.totalPrice += this.product.price;
  }
}