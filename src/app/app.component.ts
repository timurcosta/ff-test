import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  constructor(private authService: AuthService) {}
  get currentYear(): number {
    return new Date().getFullYear();
  }
  get isAuth(): boolean {
    return this.authService.isAuth;
  }

  get user(): string {
    return this.authService.user;
  }

  logout(): void {
    this.authService.logout();
  }
}
