import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface ILogin {
  login: string;
  password: string;
}

export const TOKEN_KEY = 'secret-token-hash';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}
  login(payload: ILogin): void {
    const { login, password } = payload;
    if (login === 'ivanov' && password === 'ivanov') {
      this.save('user', 'Ivan Ivanov');
      this.save('token', TOKEN_KEY);
    } else {
      throw new Error('Логин или пароль неправильные');
    }
  }

  logout(): void {
    this.remove('user');
    this.remove('token');
    this.router.navigate(['/']);
  }

  get user(): string {
    return this.load('user');
  }

  get token(): string {
    return this.load('token');
  }

  save(name: string, value: string): void {
    localStorage.setItem(name, value);
  }

  load(name: string): string {
    return localStorage.getItem(name);
  }

  remove(name: string): void {
    localStorage.removeItem(name);
  }
}
