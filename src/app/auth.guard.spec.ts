import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should auth guard is execute if user logged', () => {
    const router = TestBed.inject(Router);
    const mockUser = [
      {name:'shubham',email:'shubham@gmail.com',password:'12345',isLoggedIn:false},
      {name:'test',email:'test@gmail.com',password:'12345',isLoggedIn:true},
    ]
    
    spyOn(router,'navigate');
    spyOn(localStorage,'setItem')
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(mockUser));
    
    const result = executeGuard({} as any,{} as any);
    expect(localStorage.getItem).toHaveBeenCalledWith('users')
    expect(result).toBeTrue();

  })


  it('should auth guard is execute ', () => {
    const router = TestBed.inject(Router);
    const mockUser = [
      {name:'shubham',email:'shubham@gmail.com',password:'12345',isLoggedIn:false},
      {name:'test',email:'test@gmail.com',password:'12345',isLoggedIn:false},
    ]

    spyOn(router,'navigate');
    spyOn(localStorage,'setItem')
    spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(mockUser));
    const result = executeGuard({} as any,{} as any);
    expect(router.navigate).toHaveBeenCalledWith(['/'])
  })
  
});