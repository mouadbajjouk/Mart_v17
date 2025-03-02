import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { adminGuard } from '../../core/guards/admin.guard';

export default [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard],
  },
] satisfies Route[];
