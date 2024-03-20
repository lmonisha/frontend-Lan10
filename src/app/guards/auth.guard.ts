import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  console.log('loginService.isLoggedIn---->',loginService.isLoggedIn)
  return loginService.isLoggedIn?true:router.navigate(['/']);
};
