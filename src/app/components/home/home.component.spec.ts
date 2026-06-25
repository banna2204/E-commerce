import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { ProductService } from 'src/app/product.service';
import { min, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Product } from 'src/app/product';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: ProductService;
  
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, FormsModule],
      declarations: [HomeComponent]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    service = TestBed.inject(ProductService);
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should service call', () => {
    
    const mockProduct = [
      { id: 1, title: 'hello', quantity: 20, image: '', price: 20, category: 'mobile', description: 'nice phone', rating: { rate: 5, count: 5 } },
    ]
    .0
    
    spyOn(service, 'getProduct').and.returnValue(of(mockProduct))
    
    component.ngOnInit();
    
    expect(component.products).toEqual(mockProduct)
  })
  
  it('should initial value check', () => {
    service.inputData.subscribe((data) => {
      expect(data).toEqual('');
    })
  })

  it('should update emit value', () => {
    service.onInputDataEmit('jewelery');

    service.inputData.subscribe((data) => {
      expect(data).toEqual('jewelery')
    })
  })

  it('should filter product based on input', () => {
    const mockProduct = [
      { 
        id: 1, title: 'jewelery', quantity: 5, image: '', price: 120, category: 'jewelery', description: 'nice jewelery', rating: { rate: 5, count: 5 } 
      },
      { 
        id: 2, title: 'mens', quantity: 5, image: '', price: 50, category: "men's clothing", description: 'nice mens cloths', rating: { rate: 5, count: 5 } 
      },
      { 
        id: 3, title: 'women', quantity: 5, image: '', price: 80, category: "women's clothing", description: 'nice womens clothing' , rating: { rate: 5, count: 5 } 
      },
    ]

    const expectedProducts = [
      { 
        id: 1, title: 'jewelery', quantity: 5, image: '', price: 120, category: 'jewelery', description: 'nice jewelery', rating: { rate: 5, count: 5 } 
      },
    ]

    spyOn(service, 'getProduct').and.returnValue(of(mockProduct))

    component.ngOnInit();

    service.onInputDataEmit('jewelery');

    service.inputData.subscribe((data) => {
      expect(component.serchedProducts).toEqual(expectedProducts)
    })

  })


  it('should return unique category', () => {

    const mockProduct = [
      { 
        id: 1, title: 'jewelery', quantity: 5, image: '', price: 120, category: 'jewelery', description: 'nice jewelery', rating: { rate: 5, count: 5 } 
      },
      { 
        id: 2, title: 'mens', quantity: 5, image: '', price: 50, category: 'jewelery', description: 'nice mens cloths', rating: { rate: 5, count: 5 } 
      },
    ]

    spyOn(service,'getProduct').and.returnValue(of(mockProduct));

    component.ngOnInit();

    const result = component.getCategory();

    expect(result).toContain('jewelery')
  })

  
  it('should get filter data', () => {
    component.minPrice = 100;
    component.maxPrice = 500;
    component.SelectProduct = 'all';
    let expectedProduct;
    if(component.SelectProduct === 'jewelery'){
        expectedProduct = [
        { 
          id: 1, title: 'jewelery', quantity: 5, image: '', price: 120, category: 'jewelery', description: 'nice jewelery', rating: { rate: 5, count: 5 } 
        }
      ]
    }else{
       expectedProduct = [
        { 
          id: 1, title: 'jewelery', quantity: 5, image: '', price: 120, category: 'jewelery', description: 'nice jewelery', rating: { rate: 5, count: 5 } 
        },
        { 
        id: 2, title: 'mens', quantity: 5, image: '', price: 150, category: 'men clothing', description: 'nice mens cloths', rating: { rate: 5, count: 5 } 
        },
      ]
    }
   
    const mockProduct = [
      { 
        id: 1, title: 'jewelery', quantity: 5, image: '', price: 120, category: 'jewelery', description: 'nice jewelery', rating: { rate: 5, count: 5 } 
      },
      { 
        id: 2, title: 'mens', quantity: 5, image: '', price: 150, category: 'men clothing', description: 'nice mens cloths', rating: { rate: 5, count: 5 } 
      },
      { 
        id: 3, title: 'jewelery', quantity: 5, image: '', price: 50, category: 'jewelery', description: 'nice mens cloths', rating: { rate: 5, count: 5 } 
      },
    ]

   
    spyOn(service,'getProduct').and.returnValue(of(mockProduct));

    component.ngOnInit();


    component.applyFilter()

    expect(component.serchedProducts).toEqual(expectedProduct)
  })

  // it('should cart add to addToCart', () => {
  //   const mockProduct = [
  //     {id:1,title:'women clothing',quantity:1,image:'',price:120,category:"women's clothing",description:'nice phone',rating:{rate:5,count:5}},
  //     {id:2,title:'jewelery',quantity:1,image:'',price:10,category:'jewelery',description:'nice phone',rating:{rate:5,count:5}},
  //     {id:3,title:'mens cloths',quantity:0,image:'',price:220,category:"men's clothing",description:'nice phone',rating:{rate:5,count:5}},
  //   ]

  //   const localMockProduct = [
  //     {id:1,title:'women clothing',quantity:1,image:'',price:120,category:"women's clothing",description:'nice phone',rating:{rate:5,count:5}},
  //     {id:2,title:'jewelery',quantity:1,image:'',price:10,category:'jewelery',description:'nice phone',rating:{rate:5,count:5}},
  //   ]

  //   spyOn(service,'getProduct').and.returnValue(of(mockProduct))
  //   component.ngOnInit();

  //   spyOn(localStorage,'setItem');
  //   spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(localMockProduct))

  //   component.addToCart(mockProduct[3]?.id);

  //   spyOn

  // })
});