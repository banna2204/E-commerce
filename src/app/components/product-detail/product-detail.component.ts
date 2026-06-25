import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/product';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {
  constructor(private router: ActivatedRoute, private productService: ProductService) { }
  product?: Product;
  id:string = ''
  ngOnInit() {
    this.router.paramMap.subscribe((param) => {
      this.id = param.get('id') ?? ''
      if(this.id){
        this.productService.getProductById(this.id).subscribe((product) => {
          this.product = product;
        })
      }
    })
  }
}
