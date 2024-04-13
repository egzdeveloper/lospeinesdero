import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

    if (localStorage.getItem('token')) {
      router.navigateByUrl('/dashboard');
      return false;
    } else {
      return true;
    }
};
