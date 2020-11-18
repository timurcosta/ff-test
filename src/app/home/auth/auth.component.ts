import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.styl'],
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuth) this.router.navigate(['/main']);
    this.authForm = this.fb.group({
      login: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  get fv(): FormGroup['value'] {
    return this.authForm.value;
  }

  submitForm(): void {
    if (!this.authForm.valid) {
      Object.keys(this.authForm.controls).forEach((key) => {
        this.authForm.controls[key].markAsDirty();
        this.authForm.controls[key].updateValueAndValidity();
      });
    } else {
      this.authService.login(this.fv);
      this.router.navigate(['/main']);
    }
  }
}
