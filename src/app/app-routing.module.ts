import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from '@home/auth/auth.component';
import { MainComponent } from '@home/main/main.component';
import { AuthGuard } from '@guards/auth.guard';

const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
