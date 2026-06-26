import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product-detail.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProductService } from 'src/app/product.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let service : ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,FormsModule,MatCardModule],
      declarations: [ProductDetailComponent],
      providers:[
        {
          provide:ActivatedRoute,
          useValue:{
            paramMap: of({ get: () => '123' })
          }
        }
      ]
    });
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    service = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get product by id', () => {
    const mockProduct ={ id: 1, title: 'hello', quantity: 2, image: '', price: 20, category: 'mobile', description: 'nice phone', rating: { rate: 5, count: 5 } }
    spyOn(service,'getProductById').and.returnValue(of(mockProduct))
    component.ngOnInit()
    expect(component.product).toEqual(mockProduct)
  })
});