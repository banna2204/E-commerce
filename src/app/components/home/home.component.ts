import { Component, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private productService : ProductService){}

  products:any
  serchedProducts:any

  ngOnInit(){
    this.productService.getProduct().subscribe((data)=>{
      this.products = data
      this.serchedProducts = this.products;
    })

    this.productService.inputData.subscribe((data)=>{
      this.serchedProducts  = this.products?.filter((product:any)=>product.category?.includes(data))
    })
  }

  matchProduct:boolean=false;

  addToCart(id:number){
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]')

    let product = this.products.find((product:any)=> product.id === id);
    this.matchProduct = localProducts.some((product:any)=>product.id === id);
    if(this.matchProduct){
      alert('Product already added!!');
    }else{
      localProducts.push({...product,quantity:1});
    }  
    localStorage.setItem('products',JSON.stringify(localProducts));
  }
}
