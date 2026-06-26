import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOrdersComponent } from './my-orders.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyOrdersComponent', () => {
  let component: MyOrdersComponent;
  let fixture: ComponentFixture<MyOrdersComponent>;
  let testTotalPrice = 0;

   const mockProduct = [
      { id: 1, title: 'hello', quantity: 5, image: '', price: 20, category: 'mobile', description: 'nice phone', rating: { rate: 5, count: 5 } },
      { id: 2, title: 'hello', quantity: 1, image: '', price: 120, category: 'jewelery', description: 'nice phone', rating: { rate: 5, count: 5 } },
    ]

    for(let i=0; i<mockProduct.length;i++){
      testTotalPrice += mockProduct[i].quantity * mockProduct[i].price;
    }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterModule,RouterTestingModule],
      declarations: [MyOrdersComponent]
    });
    fixture = TestBed.createComponent(MyOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total price', () => {
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(mockProduct));

    component.ngOnInit();

    expect(component.totalPrice).toBe(testTotalPrice)
  })

  it('should increase quantity', () => {
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(mockProduct));
    component.ngOnInit()
    component.increaseQuantity(mockProduct[0]?.id)

    expect(component.product?.quantity).toEqual(mockProduct[0].quantity + 1)
    let totalIncreasePrice = testTotalPrice + mockProduct[0].price
    expect(component.totalPrice).toEqual(totalIncreasePrice)
  })

  it('should decrease quantity', () => {
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(mockProduct));
    component.ngOnInit()
    component.decreaseQuantity(mockProduct[0]?.id)

    expect(component.product?.quantity).toEqual(mockProduct[0].quantity - 1)
    let totalDecreasePrice = testTotalPrice - mockProduct[0].price
    expect(component.totalPrice).toEqual(totalDecreasePrice)
    
    component.decreaseQuantity(mockProduct[1]?.id)
    expect(component.product?.quantity).toEqual(0)
  })
});
