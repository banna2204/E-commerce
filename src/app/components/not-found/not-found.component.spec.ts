import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundComponent } from './not-found.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[RouterTestingModule],
      declarations: [NotFoundComponent]
    });
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialization execute', () => {
    const mockUser = [
      {
        name:'shubham',email:'shubham@gmail.com',password:'12345',isLoggedIn:false
      },
      {
        name:'test',email:'test@gmail.com',password:'12345',isLoggedIn:true
      },
    ]

    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(mockUser));
    component.ngOnInit();
    expect(component.isLogged).toBe(true);     
  })
});
