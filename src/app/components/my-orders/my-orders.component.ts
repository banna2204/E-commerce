import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  dataSource: Product[] = [];
  displayedColumns: string[] = ['title', 'quantity', 'price'];
  totalPrice: number = 0;
  product?: Product;

  ngOnInit() {
    this.dataSource = JSON.parse(localStorage.getItem('products') || '[]')
    if(this.dataSource){
      for (let i = 0; i < this.dataSource.length; i++) {
        this.totalPrice += this.dataSource[i].price * this.dataSource[i].quantity;
      }
    }
  }

  increaseQuantity(id: number) {
    this.product = this.dataSource.find((p: Product) => p.id === id)
    if (this.product) {
      this.product.quantity += 1;
      this.totalPrice += this.product.price;
    }
  }

  decreaseQuantity(id: number) {
    this.product = this.dataSource.find((p: Product) => p.id === id)
    if (this.product && this.product.quantity > 1) {
      this.product.quantity -= 1;
      this.totalPrice -= this.product.price;
    } else {
      if (this.product) {
        this.product.quantity = 0;
        this.dataSource = this.dataSource.filter((product: Product) => product.id !== id)
        this.totalPrice -= this.product.price;
        localStorage.setItem('products', JSON.stringify(this.dataSource));
      }
    }
  }


}