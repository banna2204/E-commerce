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
            params:of({id:101})
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

  // it('should get id', () => {

  //   // const mockProductById = { id: 1, title: 'hello', quantity: 20, image: '', price: 20, category: 'mobile', description: 'nice phone', rating: { rate: 5, count: 5 } };

  //   // spyOn(service, 'getProductById').and.returnValue(of(mockProductById))
  //   // component.ngOnInit();

  //   expect(service.getProductById).toHaveBeenCalledWith(component.id)
  // })
});