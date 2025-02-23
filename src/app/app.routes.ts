import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/layout/admin/admin-layout.component';
import { LayoutComponent } from './layout/layout/normal/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes'),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./pages/admin/admin.routes'),
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./pages/home/home.routes').then(t => t.routes),
  },
];
