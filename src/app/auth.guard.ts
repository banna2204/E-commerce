import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const isLogged = users.some((user:any)=>user.isLoggedIn===true);
  if(!isLogged){
    return router.navigate(['/']);
  }
  return true;
};
