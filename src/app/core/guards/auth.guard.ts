import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService, TOKEN_KEY } from '@services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    const user = this.authService.user;
    const token = this.authService.token;
    if (user && token === TOKEN_KEY) return true;
    this.router.navigate(['/']);
    return false;
  }
}
