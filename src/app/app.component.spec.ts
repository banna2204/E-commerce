import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ProductService } from './product.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { User } from './user';
import { Router } from '@angular/router';


describe('AppComponent', () => {
  let service: ProductService;
  let component: AppComponent

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],
      declarations: [AppComponent],
      providers: [ProductService]
    })

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(ProductService)
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should call loadData on initialization', () => {
    const mockProduct = [
      { id: 1, title: 'hello', quantity: 20, image: '', price: 20, category: 'mobile', description: 'nice phone', rating: { rate: 5, count: 5 } },
    ]

    spyOn(service, 'getProduct').and.returnValue(of(mockProduct))
    component.ngOnInit();
    expect(component.products).toEqual(mockProduct);
  });

  it(`should have as title 'e-commerce'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('e-commerce');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content')?.textContent).toContain('e-commerce app is running!');
  });

  it('should render logout method', () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    const router = TestBed.inject(Router);

    spyOn(router, 'navigate');

    const mockUsers = [
      {
        name: 'shubham', email: 's@gmail.com', password: '123456', isLoggedIn: true
      },
    ]
    const ExpectedUser = [{
      name: 'shubham', email: 's@gmail.com', password: '123456', isLoggedIn: false
    }
    ]

    component.user = {
      name: 'shubham', email: 's@gmail.com', password: '123456', isLoggedIn: true
    },

      spyOn(localStorage, 'setItem')
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(mockUsers))

    component.logout();

    expect(localStorage.setItem).toHaveBeenCalledWith('users', JSON.stringify(ExpectedUser))
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  })
});