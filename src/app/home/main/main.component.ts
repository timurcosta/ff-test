import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthService } from '@services/auth.service';
import { DataService } from '@services/data.service';
import { IResolution, IResolutionState } from '@services/mock-data.service';
import { EMPTY, Observable } from 'rxjs';

interface IResolutionOption {
  value: string;
  label: string;
}

enum StateEnum {
  Rejected,
  Approved,
}

@UntilDestroy()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.styl'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  resolutionForm: FormGroup;
  resolutions: IResolutionOption[] = [
    { value: 'totally_approved', label: 'Полностью согласен' },
    { value: 'approved', label: 'Согласен' },
    { value: 'not_approved', label: 'Не согласен' },
    { value: 'approve_paint_in_blue', label: 'Разрешаю красить в синий цвет' },
  ];
  resolution$: Observable<IResolution>;
  resolutionState$: Observable<IResolutionState>;

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getResolution(this.randomId);
    this.resolutionForm = this.fb.group({
      resolution: ['', [Validators.required]],
      comment: [null],
    });
  }

  get fv(): FormGroup['value'] {
    return this.resolutionForm.value;
  }

  get fc(): FormGroup['controls'] {
    return this.resolutionForm.controls;
  }

  approve(): void {
    this.submitForm(StateEnum.Approved);
  }

  reject(): void {
    this.submitForm(StateEnum.Rejected);
  }

  submitForm(state: StateEnum): void {
    if (!this.resolutionForm.valid) {
      Object.keys(this.resolutionForm.controls).forEach((key: string) => {
        this.resolutionForm.controls[key].markAsDirty();
        this.resolutionForm.controls[key].updateValueAndValidity();
      });
    } else {
      const payload = {
        approver: this.authService.user,
        ...this.fv,
        id: this.randomId,
        state,
      };
      this.data
        .setResolutionState(payload)
        .pipe(untilDestroyed(this))
        .subscribe();
      this.getResolutionState(this.randomId);
    }
  }

  getResolution(id: number): void {
    this.resolution$ = this.data.getResolution(id);
  }

  getResolutionState(id: number): void {
    this.resolutionState$ = this.data.getResolutionState(id);
  }

  getResolutionLabel(value: string): string {
    return this.resolutions.find((x) => x.value === value).label;
  }

  goBack(): void {
    this.resolutionForm.reset();
    this.getResolutionState(this.randomId);
    this.resolutionState$ = EMPTY;
  }

  get randomId(): number {
    return Math.floor(Math.random() * 1000);
  }

  trackByFn(index: number): number {
    return index;
  }
}
