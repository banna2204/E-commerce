import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { RouterTestingModule } from '@angular/router/testing';
import { from, of } from 'rxjs';
import { Router } from '@angular/router';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[FormsModule,ReactiveFormsModule,BrowserAnimationsModule,MatInputModule,RouterTestingModule],
      declarations: [RegistrationComponent]
    });
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should registration validate', () => {
    const registerForm = component.registrationForm;
    expect(registerForm.contains('name')).toBeTrue();
    expect(registerForm.contains('email')).toBeTrue();
    expect(registerForm.contains('password')).toBeTrue();

    const emailValid = registerForm.get('email')
    emailValid?.setValue('');
    expect(emailValid?.valid).toBeFalse()

    emailValid?.setValue('shubham');
    expect(emailValid?.valid).toBeFalse();
  })

  it('should user register', () => {
    const registerForm = component.registrationForm;
    const router = TestBed.inject(Router);
    const mockUser = [
      {
        name:'shubham',email:'shubham@gmail.com',password:'12345',isLoggedIn:false
      },
      {
        name:'test',email:'test@gmail.com',password:'12345',isLoggedIn:false
      },
    ]

    const alertSpy = spyOn(window,'alert')
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(mockUser));
    spyOn(router,'navigate')

    registerForm?.setValue({
      name:'shubham',email:'shubham@gmail.com',password:'12345'
    })

    component.onSubmit()
    expect(alertSpy).toHaveBeenCalledWith('user already exist!!')

    registerForm?.setValue({
      name:'s',email:'s@gmail.com',password:'12345'
    })

    component.onSubmit();
    expect(router.navigate).toHaveBeenCalledWith(['/'])    
  })
});
