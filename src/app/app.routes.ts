import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes'),
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.routes'),
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./pages/home/home.routes').then(t => t.routes),
  },
];
