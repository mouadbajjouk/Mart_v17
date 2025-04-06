import { Route } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { adminGuard } from '../../core/guards/admin.guard';
import { ProductsComponent } from './pages/products/products.component';

export default [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [adminGuard],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivate: [adminGuard],
  },
] satisfies Route[];
