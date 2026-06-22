import { Component, ViewChild } from '@angular/core';
import { max } from 'rxjs';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private productService: ProductService) { }

  products: Product[] = [];
  serchedProducts: Product[] = [];
  matchProduct: boolean = false;
  minPrice: number = 0;
  maxPrice: number = 1000;
  SelectProduct: string = ''

  ngOnInit() {
    this.productService.getProduct().subscribe((data) => {
      this.products = data
      this.serchedProducts = this.products;
    })

    this.productService.inputData.subscribe((data) => {
      this.serchedProducts = this.products?.filter((product: Product) => product.category?.includes(data))
    })
  }

  getCategory() {
    const result = new Set();
    this.products.filter((product: Product) => !result.has(product.category) && result.add(product.category))
    return result;
  }

  // applyFilter(value: string) {
  //   this.serchedProducts = this.products?.filter((product: Product) => product.price > this.minPrice && product.price < this.maxPrice && product.category === value)
  //   if (value == 'all') {
  //     this.serchedProducts = this.products?.filter((product: Product) => product.price > this.minPrice && product.price < this.maxPrice);
  //   }
  // }

  applyFilter() {
    this.serchedProducts = this.products?.filter((product: Product) => product.price > this.minPrice && product.price < this.maxPrice && product.category === this.SelectProduct)
    if (this.SelectProduct == 'all') {
      this.serchedProducts = this.products?.filter((product: Product) => product.price > this.minPrice && product.price < this.maxPrice);
    }
  }

  addToCart(id?: number) {
    const localProducts = JSON.parse(localStorage.getItem('products') || '[]')

    let product = this.products.find((product: Product) => product.id === id);
    this.matchProduct = localProducts.some((product: Product) => product.id === id);
    if (this.matchProduct) {
      alert('Product already added!!');
    } else {
      localProducts.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('products', JSON.stringify(localProducts));
  }
}
