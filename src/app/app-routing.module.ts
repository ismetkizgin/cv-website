import { NgModule } from '@angular/core';
import { Routes, RouterModule, ChildActivationEnd } from '@angular/router';
import {
  ClientLayoutComponent,
  AdminLayoutComponent,
} from './components/layouts';
import { HomepageComponent, DashboardComponent, LoginComponent } from './pages';
import { AuthGuard } from './utils/guards';

const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [{ path: '', component: HomepageComponent }],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, data: { title: 'Dashboard', icon: 'fa fa-2x fa-home' } },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'ismet w' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
export const routingComponents = [];
