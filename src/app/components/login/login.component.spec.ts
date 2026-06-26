import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,MatInputModule,BrowserAnimationsModule,ReactiveFormsModule,RouterTestingModule],
      declarations: [LoginComponent]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('should login form validate', () => {
    
    const fixture = TestBed.createComponent(LoginComponent);
    const component = fixture.componentInstance;
    
    let loginForm = component.loginForm
    expect(loginForm.contains('email')).toBeTrue()
    expect(loginForm.contains('password')).toBeTrue();
    expect(loginForm.get('email')?.value).toBe('')
    expect(loginForm.get('password')?.value).toBe('')
    
    const emailValue = loginForm.get('email')
    emailValue?.setValue('')
    expect(emailValue?.valid).toBeFalse()
    
    const password = loginForm.get('password')
    password?.setValue('')
    expect(password?.valid).toBeFalse()
    
    loginForm?.setValue({email:'s@g',password:'12345'})
    expect(loginForm.valid).toBeTrue();
  })

  it('should user login', () => {
    const router = TestBed.inject(Router);
    const mockUser = [
      {
        name:'shubham',email:'shubham@gmail.com',password:'12345',isLoggedIn:false
      },
      {
        name:'test',email:'test@gmail.com',password:'12345',isLoggedIn:false
      },
    ]

    spyOn(router,'navigate');
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(mockUser));
    
    let loginForm = component.loginForm
    loginForm.setValue({
      email:'shubham@gmail.com',password:'12345'
    })

    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/home'])
    
    const alertSpy = spyOn(window,'alert')
    loginForm.setValue({
      email:'shubham@gmail.com',password:'1234'
    })
    component.onSubmit();
    expect(alertSpy).toHaveBeenCalledWith('credentials wrong!!')
  })

});