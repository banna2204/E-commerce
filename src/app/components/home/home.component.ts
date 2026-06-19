import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private httpClient : HttpClient){}
  products:any

  ngOnInit(){
    this.httpClient.get('https://fakestoreapi.com/products')
    .subscribe((data)=>{
      this.products = data
    })
  }

  addToCart(id:number){
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]')

    let product = this.products.filter((product:any)=> product.id === id);

    const matchProduct = localProducts.some((product:any)=>product.id === id);
    if(matchProduct){
      debugger
    }else{
      localProducts.push({...product,quantity:1});
    }

    localStorage.setItem('products',JSON.stringify(localProducts));
  }
}
