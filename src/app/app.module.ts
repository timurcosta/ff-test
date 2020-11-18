import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { AuthComponent } from '@home/auth/auth.component';
import { MainComponent } from '@home/main/main.component';
import { GlobalErrorHandler } from '@errors/global-error.handler';
import { fakeBackendProvider } from '@interceptors/fake-backend.interceptor';
import { MockDataService } from '@services/mock-data.service';

/** NZ */
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, AuthComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // NZ Modules
    NzLayoutModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzButtonModule,
    NzSelectModule,
    NzMessageModule,
    NzAvatarModule,
    NzDropDownModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    MockDataService,
    fakeBackendProvider,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
