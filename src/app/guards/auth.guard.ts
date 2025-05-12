import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { DatabaseService } from '../service/database.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const databaseService = inject(DatabaseService);
  const router = inject(Router);

  if (databaseService.isLoggedIn) {
    return true;
  } else {
    router.navigate(['/log-in']);
    return false;
  }
};
