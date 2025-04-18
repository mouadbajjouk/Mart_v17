import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './layout/layout/admin/admin-layout.component';
import { LayoutComponent } from './layout/layout/basic/layout.component';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.routes'),
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [adminGuard],
    loadChildren: () => import('./pages/admin/admin.routes'),
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () => import('./pages/home/home.routes').then(t => t.routes),
  },
];
