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

  ngOnInit() {
    this.router.paramMap.subscribe((param) => {
      let id = param.get('id');
      if(id){
        this.productService.getProductById(id).subscribe((product) => {
          this.product = product;
        })
      }
    })
  }
}
