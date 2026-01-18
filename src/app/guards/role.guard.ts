import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data['roles'] as string[];
  
  if (!authService.getCurrentUser()) {
    router.navigate(['/login']);
    return false;
  }

  if (authService.hasRole(requiredRoles)) {
    return true;
  }

  router. navigate(['/dashboard']);
  return false;
};